
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('red-bg', 'images/red_bg.png');
    this.load.image('h-flesh', 'images/flesh-h.png');
    this.load.image('v-flesh', 'images/flesh-v.png');
    this.load.image('pill', 'images/pill.png');
}


var walls;
function create() {
    this.add.image(400,300,'red-bg');

    walls = this.physics.add.staticGroup();
    walls.create(200, 16, 'h-flesh');
    walls.create(200, 600-16, 'h-flesh');
    walls.create(600, 16, 'h-flesh');
    walls.create(600, 600-16, 'h-flesh');

    walls.create(16,200,'v-flesh');
    walls.create(16,600,'v-flesh');
    walls.create(800-16,200,'v-flesh');
    walls.create(800-16,600,'v-flesh');


    drug = this.physics.add.sprite(100,450,'pill').setScale(0.5);

    drug.setBounce(0.2);
    drug.setCollideWorldBounds(true);
    this.physics.add.collider(drug, walls);
}
var cursors;

function update() {
    cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
        drug.setAccelerationX(-200);
    } else if (cursors.right.isDown) {
        drug.setAccelerationX(200);
    } else {
        drug.setAccelerationX(0);
    }

    if (cursors.up.isDown) {
        drug.setAccelerationY(-200);
    } else if (cursors.down.isDown) {
        drug.setAccelerationY(200);
    } else {
        drug.setAccelerationY(0);
    }

    if (drug.body.velocity.x > 200) {
        drug.body.velocity.x = 200;
    } else if (drug.body.velocity.x < -200) {
        drug.body.velocity.x = -200;
    }

    if (drug.body.velocity.y > 200) {
        drug.body.velocity.y = 200;
    } else if (drug.body.velocity.y < -200) {
        drug.body.velocity.y = -200;
    }
}
