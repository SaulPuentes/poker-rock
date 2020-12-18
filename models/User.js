
export default class User {

    _id = undefined;
    _username = undefined;
    _score = 5000;
    _password = undefined;

    constructor() {
        Object.seal(this);
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get username() {
        return this._username;
    }

    set username(value) {
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
