import Phaser from 'phaser';

export default class ArenaScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ArenaScene' });
    }

    preload() {
        this.load.image('colosseum_bg', '/images/game/colosseum_bg.png');
        this.load.image('hero_warrior', '/images/game/hero_warrior.png');
        this.load.image('hero_archer', '/images/game/hero_archer.png');
        this.load.image('hero_mage', '/images/game/hero_mage.png');
        this.load.image('monsters', '/images/game/monsters.png');
    }

    create() {
        // High Quality Background Image
        const width = 1000;
        const height = 700;

        // Add background image and scale to fit
        const bg = this.add.image(width / 2, height / 2, 'colosseum_bg');
        bg.setDisplaySize(width, height);

        // Add a subtle dark overlay for better unit visibility
        const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.3);

        // Border
        const graphics = this.add.graphics();
        graphics.lineStyle(10, 0x2a1a0a, 1); // Dark brown border
        graphics.strokeRect(0, 0, width, height);

        console.log('[ArenaScene] High quality background loaded');
    }
}
