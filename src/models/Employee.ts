// interfaces
import { IModel } from '../interfaces';

class Employee implements IModel {
    private readonly _id?: number;
    private _email: string;
    private _firstName: string;
    private _middleNames: string;
    private _lastName: string;

    constructor(email: string, firstName: string, middleNames: string, lastName: string, id?: number) {
        this._email = email;
        this._firstName = firstName;
        this._middleNames = middleNames;
        this._lastName = lastName;
        this._id = id;
    }

    getId = (): number | undefined => {
        return this._id;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get middleNames() {
        return this._middleNames;
    }

    set middleNames(value) {
        this._middleNames = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }
}

export default Employee;
