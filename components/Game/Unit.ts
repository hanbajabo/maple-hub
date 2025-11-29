import * as Phaser from 'phaser';

export type UnitState = 'IDLE' | 'MOVE' | 'ATTACK' | 'DIE';
export type JobType = 'WARRIOR' | 'ARCHER' | 'THIEF' | 'MAGICIAN' | 'PIRATE' | 'GOD';

export interface UnitStats {
    hp: number;
    maxHp: number;
    mp: number;
    maxMp: number;
    attack: number;
    def: number;
    speed: number;
    range: number;
    attackSpeed: number;
    star: number;
    id: string;
    name: string;
    tier: number;
    job: JobType;
    critRate: number;
    critDamage: number;
    mpRecoveryBonus?: number;
    skillDamageMultiplier?: number;
    skillName?: string;
}

export class Unit {
    static Phaser: any;
    scene: Phaser.Scene;
    gameObject: Phaser.GameObjects.Container;
    sprite: Phaser.GameObjects.Shape | Phaser.GameObjects.Sprite | Phaser.GameObjects.Text;
    hpBar: Phaser.GameObjects.Rectangle;
    mpBar: Phaser.GameObjects.Rectangle;

    stats: UnitStats;
    baseStats: UnitStats;
    state: UnitState = 'IDLE';
    target: Unit | null = null;

    lastAttackTime: number = 0;
    isDead: boolean = false;

    lastTargetScanTime: number = 0;
    targetScanInterval: number = 200;

    gambits: { condition: string, val: number, action: string }[] = [];
    isFleeing: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number, color: number | string, stats: UnitStats, isPlayer: boolean) {
        this.scene = scene;
        this.baseStats = { ...stats, mp: 0, maxMp: 100 };
        this.stats = { ...this.baseStats };

        if (this.stats.id === 'cleric') {
            this.gambits.push({ condition: 'ALLY_HP_LOW', val: 0.6, action: 'HEAL' });
            this.gambits.push({ condition: 'HP_LOW', val: 0.3, action: 'FLEE' });
        } else {
            this.gambits.push({ condition: 'HP_LOW', val: 0.3, action: 'FLEE' });
        }

        this.gameObject = scene.add.container(x, y);
        scene.physics.add.existing(this.gameObject);

        const body = this.gameObject.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true);
        body.setSize(40, 50);
        body.setDrag(200, 200);

        const scale = 1 + (this.stats.star - 1) * 0.3;
        this.gameObject.setScale(scale);

        if (typeof color === 'string') {
            this.sprite = scene.add.text(0, 0, color, { fontSize: '40px' }).setOrigin(0.5);
            if (!isPlayer) {
                (this.sprite as Phaser.GameObjects.Text).setFlipX(true);
            }
        } else {
            this.sprite = scene.add.rectangle(0, 0, 40, 50, color as number);
        }

        const hpColor = isPlayer ? 0x00FF00 : 0xFF0000;
        const hpBg = scene.add.rectangle(0, -35, 40, 6, 0x333333);
        this.hpBar = scene.add.rectangle(0, -35, 40, 6, hpColor);

        const mpBg = scene.add.rectangle(0, -28, 40, 4, 0x333333);
        this.mpBar = scene.add.rectangle(0, -28, 0, 4, 0x0000ff);

        const starText = scene.add.text(0, -50, '⭐'.repeat(this.stats.star), {
            fontSize: '12px', stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5);

        this.gameObject.add([this.sprite, hpBg, this.hpBar, mpBg, this.mpBar, starText]);
        this.gameObject.setData('unit', this);

        const nameColor = isPlayer ? '#00FF00' : '#FF0000';
        const nameText = scene.add.text(0, -65, this.stats.name || 'Unknown', {
            fontSize: '14px', color: nameColor, stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5);
        this.gameObject.add(nameText);
    }

    update(time: number, delta: number, enemies: Unit[], allies: Unit[]) {
        if (this.isDead) return;

        if (time % 500 < delta) {
            this.evaluateGambits(enemies, allies);
        }

        if (this.isFleeing) {
            this.handleFlee(time, enemies);
        } else {
            switch (this.state) {
                case 'IDLE':
                    this.handleIdle(time, enemies);
                    break;
                case 'MOVE':
                    this.handleMove(time);
                    break;
                case 'ATTACK':
                    this.handleAttack(time);
                    break;
                case 'DIE':
                    break;
            }
        }

        this.updateBars();
    }

    private evaluateGambits(enemies: Unit[], allies: Unit[]) {
        for (const gambit of this.gambits) {
            if (gambit.condition === 'HP_LOW') {
                if (this.stats.hp / this.stats.maxHp < gambit.val) {
                    if (gambit.action === 'FLEE' && !this.isFleeing) this.startFleeing();
                } else {
                    if (gambit.action === 'FLEE' && this.isFleeing) this.stopFleeing();
                }
            } else if (gambit.condition === 'ALLY_HP_LOW') {
                if (gambit.action === 'HEAL') {
                    const lowHpAlly = this.findLowHpAlly(allies, gambit.val);
                    if (lowHpAlly && this.stats.mp >= 30) {
                        this.performHeal(lowHpAlly);
                    }
                }
            }
        }
    }

    private findLowHpAlly(allies: Unit[], threshold: number): Unit | null {
        for (const ally of allies) {
            if (!ally.isDead && ally !== this && (ally.stats.hp / ally.stats.maxHp) < threshold) {
                return ally;
            }
        }
        return null;
    }

    private performHeal(target: Unit) {
        if (this.stats.mp < 30) return;

        this.stats.mp -= 30;
        const healAmount = this.stats.attack * 2;
        target.stats.hp = Math.min(target.stats.maxHp, target.stats.hp + healAmount);

        this.showText("HEAL!", '#00FF00');
        target.showText(`+${Math.floor(healAmount)}`, '#00FF00');

        this.scene.tweens.add({
            targets: this.sprite,
            alpha: 0.5, duration: 200, yoyo: true
        });
    }

    private startFleeing() {
        this.isFleeing = true;
        this.showText("도망쳐!", '#FF00FF');
        this.stats.speed *= 1.5;
    }

    private stopFleeing() {
        this.isFleeing = false;
        this.stats.speed /= 1.5;
        this.setState('IDLE');
    }

    private handleFlee(time: number, enemies: Unit[]) {
        const closest = this.findClosestEnemy(enemies);
        if (closest) {
            const body = this.gameObject.body as Phaser.Physics.Arcade.Body;
            const angle = Math.atan2(this.gameObject.y - closest.gameObject.y, this.gameObject.x - closest.gameObject.x);
            body.setVelocity(Math.cos(angle) * this.stats.speed, Math.sin(angle) * this.stats.speed);
        }
    }

    private findClosestEnemy(enemies: Unit[]): Unit | null {
        let closest: Unit | null = null;
        let minDst = Infinity;
        for (const e of enemies) {
            if (e.isDead) continue;
            const dst = this.getDistanceTo(e);
            if (dst < minDst) {
                minDst = dst;
                closest = e;
            }
        }
        return closest;
    }

    private showText(msg: string, color: string) {
        const text = this.scene.add.text(this.gameObject.x, this.gameObject.y - 60, msg, {
            fontSize: '16px', color: color, fontStyle: 'bold', stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5);
        this.scene.tweens.add({
            targets: text, y: text.y - 30, alpha: 0, duration: 1000,
            onComplete: () => text.destroy()
        });
    }

    private handleIdle(time: number, enemies: Unit[]) {
        if (time - this.lastTargetScanTime > this.targetScanInterval) {
            this.lastTargetScanTime = time;
            this.target = this.findBestTarget(enemies);
        }

        if (this.target) {
            this.setState('MOVE');
        } else {
            (this.gameObject.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
        }
    }

    private handleMove(time: number) {
        if (!this.isValidTarget(this.target)) {
            this.target = null;
            this.setState('IDLE');
            return;
        }

        const dist = this.getDistanceTo(this.target!);

        if (dist <= this.stats.range) {
            this.setState('ATTACK');
            (this.gameObject.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0);
            return;
        }

        const angle = Math.atan2(this.target!.gameObject.y - this.gameObject.y, this.target!.gameObject.x - this.gameObject.x);
        const body = this.gameObject.body as Phaser.Physics.Arcade.Body;
        body.setVelocity(Math.cos(angle) * this.stats.speed, Math.sin(angle) * this.stats.speed);

        // Flip logic - only for Text objects (Player)
        if (this.sprite instanceof Phaser.GameObjects.Text) {
            if (body.velocity.x > 0) {
                this.sprite.setFlipX(false);
            } else if (body.velocity.x < 0) {
                this.sprite.setFlipX(true);
            }
        }
    }

    private handleAttack(time: number) {
        if (!this.isValidTarget(this.target)) {
            this.target = null;
            this.setState('IDLE');
            return;
        }

        const dist = this.getDistanceTo(this.target!);
        if (dist > this.stats.range) {
            this.setState('MOVE');
            return;
        }

        if (this.stats.mp >= this.stats.maxMp) {
            this.useSkill(time);
            return;
        }

        if (time - this.lastAttackTime >= this.stats.attackSpeed) {
            this.performAttack(time);
        }
    }

    private performAttack(time: number) {
        this.lastAttackTime = time;
        this.gainMp(10);

        if (this.target) {
            this.showAttackEffect(this.target, false);
            this.target.takeDamage(this.stats.attack, this.stats.critRate, this.stats.critDamage);
        }
    }

    private useSkill(time: number) {
        this.stats.mp = 0;
        this.showText(this.stats.skillName || "SKILL!", '#FFFF00');

        if (this.target) {
            this.showAttackEffect(this.target, true);
            this.target.takeDamage(this.stats.attack * 2, 100, this.stats.critDamage, true);
        }
    }

    private showAttackEffect(target: Unit, isSkill: boolean) {
        const startX = this.gameObject.x;
        const startY = this.gameObject.y;
        const endX = target.gameObject.x;
        const endY = target.gameObject.y;
        const angle = Math.atan2(endY - startY, endX - startX);

        // Job specific effects
        const jobId = this.stats.id;

        if (jobId.includes('warrior') || jobId === 'paladin' || jobId === 'dark_knight' || jobId === 'hero') {
            // Warrior: Slash effect
            const color = jobId === 'paladin' ? 0xFFFF00 : (jobId === 'dark_knight' ? 0x800080 : 0xFF0000);
            const slash = this.scene.add.rectangle(endX, endY, 100, 10, color);
            slash.setRotation(angle + Math.PI / 2);
            this.scene.tweens.add({
                targets: slash,
                scaleX: 0,
                scaleY: 5,
                alpha: 0,
                duration: 300,
                onComplete: () => slash.destroy()
            });
        } else if (jobId.includes('archer') || jobId === 'bowmaster' || jobId === 'marksman') {
            // Archer: Arrow projectile
            const arrow = this.scene.add.text(startX, startY, isSkill ? '🏹🏹🏹' : '🏹', { fontSize: '20px' });
            arrow.setRotation(angle);
            this.scene.tweens.add({
                targets: arrow,
                x: endX,
                y: endY,
                duration: 200,
                onComplete: () => {
                    arrow.destroy();
                    // Hit effect
                    const hit = this.scene.add.circle(endX, endY, 20, 0xFFFF00, 0.5);
                    this.scene.tweens.add({ targets: hit, scale: 2, alpha: 0, duration: 200, onComplete: () => hit.destroy() });
                }
            });
        } else if (jobId.includes('mage') || jobId === 'arch_mage_fp' || jobId === 'bishop') {
            // Mage: Magic ball / Explosion
            const color = jobId === 'arch_mage_fp' ? '🔥' : '✨';
            if (isSkill) {
                // Explosion from sky
                const meteor = this.scene.add.text(endX, endY - 200, color, { fontSize: '60px' });
                this.scene.tweens.add({
                    targets: meteor,
                    y: endY,
                    duration: 500,
                    ease: 'Bounce.easeOut',
                    onComplete: () => {
                        meteor.destroy();
                        const boom = this.scene.add.circle(endX, endY, 100, 0xFF0000, 0.5);
                        this.scene.tweens.add({ targets: boom, scale: 1.5, alpha: 0, duration: 300, onComplete: () => boom.destroy() });
                    }
                });
            } else {
                // Magic ball
                const ball = this.scene.add.text(startX, startY, color, { fontSize: '20px' });
                this.scene.tweens.add({
                    targets: ball,
                    x: endX,
                    y: endY,
                    duration: 400,
                    onComplete: () => ball.destroy()
                });
            }
        } else if (jobId.includes('thief') || jobId === 'night_lord' || jobId === 'shadower') {
            // Thief: Throwing star / Shadow strike
            if (jobId === 'shadower' && isSkill) {
                // Shadow strike (teleport hit)
                this.gameObject.setAlpha(0.2);
                this.gameObject.x = endX + 20;
                this.gameObject.y = endY;
                this.scene.time.delayedCall(200, () => {
                    this.gameObject.setAlpha(1);
                    const slash = this.scene.add.rectangle(endX, endY, 80, 5, 0x000000);
                    this.scene.tweens.add({ targets: slash, angle: 360, alpha: 0, duration: 300, onComplete: () => slash.destroy() });
                });
            } else {
                // Throwing star
                const star = this.scene.add.text(startX, startY, '⭐', { fontSize: '20px' });
                this.scene.tweens.add({
                    targets: star,
                    x: endX,
                    y: endY,
                    angle: 360,
                    duration: 150,
                    onComplete: () => star.destroy()
                });
            }
        } else if (jobId === 'buccaneer') {
            // Pirate: Punch / Energy Blast
            const punch = this.scene.add.text(endX, endY, '🥊', { fontSize: isSkill ? '50px' : '30px' });
            this.scene.tweens.add({
                targets: punch,
                scale: 1.5,
                alpha: 0,
                duration: 300,
                onComplete: () => punch.destroy()
            });
        } else {
            // Default (Enemies)
            this.scene.tweens.add({
                targets: this.sprite,
                scaleX: 1.2, scaleY: 1.2, duration: 100, yoyo: true
            });
        }
    }

    public takeDamage(rawDamage: number, critRate: number, critDamage: number, isSkill: boolean = false) {
        if (this.isDead) return;

        let damage = rawDamage;
        const isCrit = Math.random() * 100 < critRate;
        if (isCrit) {
            damage *= (critDamage / 100);
        }

        damage = Math.max(1, damage - this.stats.def);
        this.stats.hp -= damage;

        this.showDamageText(damage, isCrit, isSkill);
        this.gainMp(5);

        if (this.stats.hp <= 0) {
            this.die();
        }
    }

    private showDamageText(amount: number, isCrit: boolean, isSkill: boolean) {
        let color = '#FFFFFF';
        let fontSize = '16px';
        if (isCrit) { color = '#FF0000'; fontSize = '20px'; }
        if (isSkill) { color = '#FFFF00'; fontSize = '24px'; }

        const text = this.scene.add.text(this.gameObject.x, this.gameObject.y - 40, Math.floor(amount).toString(), {
            fontSize: fontSize, color: color, stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5);

        this.scene.tweens.add({
            targets: text, y: text.y - 50, alpha: 0, duration: 800,
            onComplete: () => text.destroy()
        });
    }

    private gainMp(amount: number) {
        this.stats.mp = Math.min(this.stats.maxMp, this.stats.mp + amount);
    }

    public applySynergies(bonuses: any[]) {
        this.stats = { ...this.baseStats };
        bonuses.forEach(b => {
            if (b.job === this.stats.job || b.job === 'ALL') {
                b.apply(this.stats);
            }
        });
    }

    private die() {
        this.isDead = true;
        this.state = 'DIE';
        this.gameObject.setAlpha(0.5);
        this.scene.tweens.add({
            targets: this.gameObject,
            alpha: 0,
            duration: 1000,
            onComplete: () => {
                this.gameObject.destroy();
            }
        });
    }

    private setState(newState: UnitState) {
        this.state = newState;
    }

    private findBestTarget(enemies: Unit[]): Unit | null {
        let bestTarget: Unit | null = null;
        let minScore = Infinity;

        for (const e of enemies) {
            if (e.isDead) continue;
            const dst = this.getDistanceTo(e);
            if (dst < minScore) {
                minScore = dst;
                bestTarget = e;
            }
        }
        return bestTarget;
    }

    private isValidTarget(target: Unit | null): boolean {
        return target !== null && !target.isDead && target.gameObject.active;
    }

    private getDistanceTo(target: Unit): number {
        if (Unit.Phaser) {
            return Unit.Phaser.Math.Distance.Between(
                this.gameObject.x, this.gameObject.y,
                target.gameObject.x, target.gameObject.y
            );
        }
        const dx = this.gameObject.x - target.gameObject.x;
        const dy = this.gameObject.y - target.gameObject.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    private updateBars() {
        if (!this.gameObject.active) return;

        const hpPercent = Math.max(0, this.stats.hp / this.stats.maxHp);
        this.hpBar.width = 40 * hpPercent;

        const mpPercent = Math.max(0, this.stats.mp / this.stats.maxMp);
        this.mpBar.width = 40 * mpPercent;
    }
}
