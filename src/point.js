export default class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    list() {
        return [this.x, this.y, this.z];
    }
}
