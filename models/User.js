
export default class User {

    _name = undefined;
    _score = 0;
    _password = undefined;

    constructor() {
        Object.seal(this);
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get score() {
        return this._score;
    }

    set score(value) {
        this._score = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

}
