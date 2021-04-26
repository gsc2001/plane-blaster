export default {
    // camera stuff
    camera: {
        near: 0.1,
        far: 200,
        view_angle: 75,
        initial_position: [0, -8, 6],
        lookAt: [0, 10, 0],
        speed: 0.01,
    },

    debug: true,
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

    playing_z: 0,
    ground: {
        z: -2,
    },
    minx: -10,
    maxx: 10,
    miny: -2,
    maxy: 100,

    player: {
        health: 100,
        hitHealthDecrease: 5,
        speed: 0.2,
        initial_position: [0, -2, 0],
        rotationSpeed: Math.PI / 50,
    },

    scoreAdd: 10,
    enemiesMin: 4,
    enemiesMax: 10,
    enemiesSpeed: 0.04,
    enemyBulletDelay: 1000,
    enemyActivateDist: 10,
    bulletSpeed: 0.08,
    bulletMinDelay: 700,
};
