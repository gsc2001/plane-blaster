export default {
    // camera stuff
    camera: {
        near: 0.1,
        far: 40,
        view_angle: 75,
        initial_position: [0, -8, 6],
        lookAt: [0, 10, 0],
        speed: 0.01,
    },

    debug: false,
    // lighting
    lighting: {
        ambient: {
            on: true,
            intensity: 3,
        },
        point: {
            on: false,
            intensity: 20,
            position: [0, -20, 20],
        },
        directional: {
            on: true,
            intensity: 5,
            position: [0, -10, 10],
            lookAt: [0, 0, 0],
        },
    },

    playing_z: -0.5,
    ground: {
        z: -4,
    },
    minx: -10,
    maxx: 10,
    miny: -2,
    maxy: 100,

    player: {
        health: 100,
        hitHealthDecrease: 5,
        crashHealthDecrease: 40,
        speed: 0.2,
        initial_position: [0, -2, -0.5],
        rotationSpeed: Math.PI / 50,
        rollSpeed: Math.PI / 25,
        maxRoll: Math.PI / 6,
    },

    starsMin: 10,
    startMax: 20,

    scoreAdd: 10,
    enemiesMin: 8,
    enemiesMax: 10,
    enemiesSpeed: 0.04,
    enemyBulletDelay: 1000,
    enemyActivateDist: 35,
    bulletSpeed: 0.2,
    bulletMinDelay: 700,
};
