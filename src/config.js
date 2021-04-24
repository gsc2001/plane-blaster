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
            intensity: 20,
            position: [0, 0, 10],
            lookAt: [0, 0, 0],
        },
    },

    playing_z: 0,
    // ground
    ground: {
        z: -2,
    },
    minx: -10,
    maxx: 10,
    miny: -2,
    maxy: 100,

    player: {
        speed: 0.2,
        initial_position: [0, -2, 0],
    },

    scoreAdd: 10,
    enemiesMin: 4,
    enemiesMax: 10,
};
