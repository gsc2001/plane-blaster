export default {
    // camera stuff
    camera: {
        near: 1,
        far: 1000,
        view_angle: 45,
        initial_position: [0, -12, 6],
        speed: 0.01,
    },

    debug: true,
    // lighting
    lighting: {
        ambient: {
            on: true,
            intensity: 2,
        },
        point: {
            on: true,
            intensity: 20,
            position: [0, -80, 80],
        },
        directional: {
            on: false,
            intensity: 10,
            position: [0, -10, 10],
            lookAt: [0, 0, 0],
        },
    },

    playing_z: 0,
    // ground
    ground: {
        z: -2,
    },
    minx: -12.5,
    maxx: 12.5,
    miny: -50,
    maxy: 50,

    player: {
        speed: 0.2,
        initial_position: [0, -4.5, 0],
    },
};
