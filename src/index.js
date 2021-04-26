import Game from './game';
import config from './config';

const pb = new Game();

function update_world() {
    requestAnimationFrame(update_world);
    pb.update();
    pb.render();
}

pb.init().then(() => {
    console.log('Game initialized');
    document.addEventListener('keydown', e => pb.handleKeyDown(e));
    document.addEventListener('keyup', e => pb.handleKeyUp(e));
    update_world();
});
