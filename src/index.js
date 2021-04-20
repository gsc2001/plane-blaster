import Game from './game';

const pb = new Game();

function animation() {
    requestAnimationFrame(animation);
    pb.update();
}

pb.init().then(() => {
    console.log('Game initialized');
    document.addEventListener('keydown', e => pb.handleInputs(e));
    animation();
});
