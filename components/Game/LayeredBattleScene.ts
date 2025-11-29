import * as Phaser from 'phaser';

export default class LayeredBattleScene extends Phaser.Scene {
    platforms!: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super('LayeredBattleScene');
        console.log('LayeredBattleScene: Constructor called');
    }

    preload() {
        // No remote assets for now to ensure stability
    }

    create() {
        console.log('LayeredBattleScene: Create called');

        // Initialize Platforms Group
        this.platforms = this.physics.add.staticGroup();

        // 1. Background
        this.add.rectangle(400, 300, 800, 600, 0x87CEEB); // Sky Blue Background

        // 2. Layer Setup
        // Layer 1: Ground (Bottom) - y=550
        this.createPlatform(400, 550, 800, 32, 0x8B4513, 'Layer 1: Ground');

        // Layer 2: Platform (Middle) - y=400
        this.createPlatform(200, 400, 300, 20, 0x654321, 'Layer 2: Platform A');
        this.createPlatform(600, 400, 300, 20, 0x654321, 'Layer 2: Platform B');

        // Layer 3: Air (Top) - y=150
        this.add.text(400, 150, 'Layer 3: Air Zone', { fontSize: '24px', color: '#FFF' }).setOrigin(0.5);

        // Drag & Drop Handling
        this.input.on('drag', (pointer: any, gameObject: any, dragX: number, dragY: number) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
            // Temporarily disable physics while dragging
            if (gameObject.body) {
                gameObject.body.setAllowGravity(false);
                gameObject.body.setVelocity(0, 0);
            }
        });

        this.input.on('dragend', (pointer: any, gameObject: any) => {
            // Snap to nearest layer
            const y = gameObject.y;
            let targetY = 550 - 25; // Default to Ground (minus half height)

            if (y < 250) {
                targetY = 150; // Air
                // Air units might fly, others fall? For now, snap all.
                if (gameObject.body) gameObject.body.setAllowGravity(false); // Fly
            } else if (y < 475) {
                targetY = 400 - 25; // Platform
                if (gameObject.body) gameObject.body.setAllowGravity(true);
            } else {
                targetY = 550 - 25; // Ground
                if (gameObject.body) gameObject.body.setAllowGravity(true);
            }

            // Animate snap
            this.tweens.add({
                targets: gameObject,
                y: targetY,
                duration: 200,
                ease: 'Power2'
            });

            // Re-enable physics if needed (gravity will handle y if allowed)
            if (gameObject.body && targetY !== 150) {
                // If not air, let gravity settle it
                gameObject.body.setAllowGravity(true);
            }
        });
    }

    createPlatform(x: number, y: number, width: number, height: number, color: number, label: string) {
        const platform = this.add.rectangle(x, y, width, height, color);
        this.physics.add.existing(platform, true); // Static body
        this.platforms.add(platform); // Add to group
        this.add.text(x, y, label, { fontSize: '16px', color: '#FFF' }).setOrigin(0.5);
        return platform;
    }

    // ... addUnit removed as it's handled by Unit.ts now, or we can keep for testing
    addUnit(x: number, y: number, color: number, type: string) {
        // Placeholder for testing
    }

    update() {
        // Game loop logic
    }
}
