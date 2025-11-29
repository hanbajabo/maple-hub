'use client';
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Unit } from './Unit';
import { UNIT_DATABASE, UnitData, UpgradeData } from './GameData';
import ArenaScene from './ArenaScene';

interface PhaserGameProps {
    onGoldUpdate: (amount: number) => void;
    onLevelUp: (level: number) => void;
    onExpUpdate: (currentExp: number, requiredExp: number) => void;
}

export interface PhaserGameRef {
    upgradeHero: (upgrade: UpgradeData) => void;
    changeJob: (jobId: string) => void;
}

const PhaserGame = forwardRef<PhaserGameRef, PhaserGameProps>(({ onGoldUpdate, onLevelUp, onExpUpdate }, ref) => {
    const gameRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<Phaser.Scene | null>(null);
    const heroRef = useRef<Unit | null>(null);
    const killCountRef = useRef<number>(0);
    const levelRef = useRef<number>(1);
    const expRef = useRef<number>(0);
    const MAX_ENEMIES = 30;

    const getRequiredExp = (level: number) => {
        return Math.floor(100 + (level * 50));
    };

    useImperativeHandle(ref, () => ({
        upgradeHero: (upgrade: UpgradeData) => {
            if (heroRef.current && !heroRef.current.isDead) {
                const hero = heroRef.current;
                if (upgrade.type === 'STAT' && upgrade.statType) {
                    if (upgrade.statType === 'attack') hero.stats.attack *= (1 + upgrade.value);
                    else if (upgrade.statType === 'attackSpeed') hero.stats.attackSpeed *= (1 - upgrade.value);
                    else if (upgrade.statType === 'hp') {
                        const ratio = hero.stats.hp / hero.stats.maxHp;
                        hero.stats.maxHp *= (1 + upgrade.value);
                        hero.stats.hp = hero.stats.maxHp * ratio;
                    }
                    else if (upgrade.statType === 'critRate') hero.stats.critRate += upgrade.value;
                    else if (upgrade.statType === 'def') hero.stats.def += upgrade.value;

                    if (sceneRef.current) {
                        const text = sceneRef.current.add.text(hero.gameObject.x, hero.gameObject.y - 80, "UPGRADE!", {
                            fontSize: '20px', color: '#00FFFF', fontStyle: 'bold'
                        }).setOrigin(0.5);
                        sceneRef.current.tweens.add({
                            targets: text, y: text.y - 50, alpha: 0, duration: 1000,
                            onComplete: () => text.destroy()
                        });
                    }
                }
            }
        },
        changeJob: (jobId: string) => {
            if (heroRef.current && sceneRef.current) {
                const newJobData = UNIT_DATABASE[jobId];
                if (!newJobData) return;

                const hero = heroRef.current;

                // Update stats (keep HP immortal)
                hero.stats = {
                    ...newJobData,
                    mp: hero.stats.mp,
                    maxMp: 100,
                    star: 1,
                    maxHp: 999999,
                    hp: 999999
                };
                hero.baseStats = { ...hero.stats };

                // Update sprite (Text)
                if (hero.sprite && typeof hero.sprite === 'object' && 'setText' in hero.sprite) {
                    (hero.sprite as Phaser.GameObjects.Text).setText(String(newJobData.color));
                }

                // Show job change effect
                const text = sceneRef.current.add.text(hero.gameObject.x, hero.gameObject.y - 100, `${newJobData.name} 전직!`, {
                    fontSize: '30px', color: '#FFD700', fontStyle: 'bold', stroke: '#000', strokeThickness: 4
                }).setOrigin(0.5);
                sceneRef.current.tweens.add({
                    targets: text, y: text.y - 50, alpha: 0, duration: 2000,
                    onComplete: () => text.destroy()
                });

                console.log(`[PhaserGame] ⚔️ Job changed to: ${newJobData.name}`);
            }
        }
    }));

    useEffect(() => {
        let game: Phaser.Game | null = null;
        const initGame = async () => {
            if (typeof window === 'undefined') return;
            const _Phaser = await import('phaser');
            const Phaser = _Phaser.default || _Phaser;
            Unit.Phaser = Phaser;
            let enemyUnits: Unit[] = [];

            const config: Phaser.Types.Core.GameConfig = {
                type: Phaser.AUTO,
                width: 1000,
                height: 700,
                parent: gameRef.current || undefined,
                backgroundColor: '#2d4a3e',
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { x: 0, y: 0 },
                        debug: false,
                    },
                },
                scene: [ArenaScene],
                scale: {
                    mode: Phaser.Scale.FIT,
                    autoCenter: Phaser.Scale.CENTER_BOTH,
                },
            };

            console.log('[PhaserGame] Immortal Hero Arena Mode');
            game = new Phaser.Game(config);

            game.events.once('ready', () => {
                const scene = game.scene.getScene('ArenaScene');
                if (scene) {
                    sceneRef.current = scene;
                    spawnHero(scene);
                    scheduleNextSpawn(scene);
                    scene.events.on('update', (time: number, delta: number) => {
                        updateGameLogic(scene, time, delta);
                    });
                }
            });

            function spawnHero(scene: Phaser.Scene) {
                if (heroRef.current && !heroRef.current.isDead) return;

                const unitData = UNIT_DATABASE['hero'];
                if (!unitData) return;

                const stats = { ...unitData, mp: 0, maxMp: 100, star: 1, maxHp: 999999, hp: 999999 };
                const hero = new Unit(scene, 400, 300, unitData.color, stats, true);
                heroRef.current = hero;
                console.log('[PhaserGame] ⚔️ IMMORTAL HERO spawned!');
            }

            function scheduleNextSpawn(scene: Phaser.Scene) {
                const currentDelay = Math.max(200, 1500 - (killCountRef.current * 50));
                scene.time.addEvent({
                    delay: currentDelay,
                    callback: () => {
                        if (enemyUnits.length < MAX_ENEMIES) {
                            spawnEnemy.call(scene);
                        }
                        scheduleNextSpawn(scene);
                    }
                });
            }

            function updateGameLogic(scene: Phaser.Scene, time: number, delta: number) {
                const hero = heroRef.current;
                const allies = hero && !hero.isDead ? [hero] : [];

                if (hero && !hero.isDead) {
                    if (hero.stats.hp < hero.stats.maxHp) {
                        hero.stats.hp = hero.stats.maxHp;
                    }
                    hero.update(time, delta, enemyUnits, allies);
                }

                enemyUnits = enemyUnits.filter(e => {
                    if (e.isDead) {
                        if (!(e as any).rewardClaimed) {
                            (e as any).rewardClaimed = true;
                            onGoldUpdate(2);
                            killCountRef.current++;

                            const expGain = 10 + (e.stats.star * 5);
                            expRef.current += expGain;

                            const requiredExp = getRequiredExp(levelRef.current);
                            onExpUpdate(expRef.current, requiredExp);

                            if (expRef.current >= requiredExp) {
                                expRef.current -= requiredExp;
                                levelRef.current++;
                                onLevelUp(levelRef.current);

                                if (hero && scene) {
                                    const text = scene.add.text(hero.gameObject.x, hero.gameObject.y - 120, `LEVEL UP! ${levelRef.current}`, {
                                        fontSize: '40px', color: '#FFD700', fontStyle: 'bold', stroke: '#000', strokeThickness: 6
                                    }).setOrigin(0.5);
                                    scene.tweens.add({
                                        targets: text, y: text.y - 80, alpha: 0, duration: 2000,
                                        onComplete: () => text.destroy()
                                    });
                                }
                            }
                        }
                        return false;
                    }
                    return true;
                });

                enemyUnits.forEach(enemy => {
                    enemy.update(time, delta, allies, enemyUnits);
                });
            }

            function spawnEnemy(this: Phaser.Scene) {
                let enemyKeys = ['snail', 'slime', 'stump'];
                if (killCountRef.current >= 5) enemyKeys.push('mushroom');

                const randomKey = enemyKeys[Phaser.Math.Between(0, enemyKeys.length - 1)];
                const data = UNIT_DATABASE[randomKey];
                if (!data) return;

                const edge = Phaser.Math.Between(0, 3);
                let x = 0, y = 0;

                if (edge === 0) {
                    x = Phaser.Math.Between(50, 950);
                    y = 50;
                } else if (edge === 1) {
                    x = Phaser.Math.Between(50, 950);
                    y = 650;
                } else if (edge === 2) {
                    x = 50;
                    y = Phaser.Math.Between(50, 650);
                } else {
                    x = 950;
                    y = Phaser.Math.Between(50, 650);
                }

                const difficultyMultiplier = 1 + (killCountRef.current * 0.15);
                let star = 1;
                if (Math.random() < 0.15) star = 2;
                if (killCountRef.current > 20 && Math.random() < 0.1) star = 3;

                const starMultiplier = Math.pow(2, star - 1);
                const totalMultiplier = difficultyMultiplier * starMultiplier;

                const stats = {
                    hp: data.hp * totalMultiplier,
                    maxHp: data.hp * totalMultiplier,
                    mp: 0, maxMp: 100,
                    attack: data.attack * totalMultiplier,
                    def: data.def * totalMultiplier,
                    speed: data.speed,
                    range: data.range,
                    attackSpeed: data.attackSpeed,
                    star: star,
                    id: data.id,
                    job: data.job,
                    critRate: data.critRate,
                    critDamage: data.critDamage,
                    name: data.name,
                    tier: data.tier
                };

                const enemy = new Unit(this, x, y, data.color, stats, false);
                enemyUnits.push(enemy);
            }
        };

        initGame();

        return () => {
            if (game) game.destroy(true);
            sceneRef.current = null;
        };
    }, []);

    return (
        <div
            ref={gameRef}
            id="phaser-game"
            className="rounded-xl overflow-hidden shadow-2xl"
            style={{ width: '1000px', height: '700px', backgroundColor: '#000' }}
        />
    );
});

PhaserGame.displayName = 'PhaserGame';
export default PhaserGame;
