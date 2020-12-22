
export default class Game {

    _id = undefined;
    _players = [];
    _movements = [];
    table = [];

    constructor() {
        Object.seal(this);
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get players() {
        return this._players;
    }

    get movements() {
        return this._movements;
    }
    

    get table() {
        return this.table;
    }
    
}
