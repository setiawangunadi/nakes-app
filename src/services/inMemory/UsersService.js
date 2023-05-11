const { nanoid } = require("nanoid");
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class UsersService {
    constructor() {
        this._users = [];
    }

    addUser ({ role, email, phone, password, name, address, kelurahan, kecamatan, city, province, postal_code, birthdate, gender}) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newUser = {
            id, role, email, phone, password, name, address, kelurahan, kecamatan, city, province, postal_code, birthdate, gender, createdAt, updatedAt
        };

        this._users.push(newUser);

        const isSuccess = this._users.filter((user) => user.id === id).length > 0;
        
        if (!isSuccess) {
            throw new InvariantError('User Failed Added');
        }

        return id;
    }

    getUsers() {
        return this._users;
    }

    getUserId(id) {
        const user = this._users.filter((n) => n.id === id)[0];
        if (!user) {
            throw new NotFoundError("User doesn't Exists");
        }
        return user;
    }

    editUserById(id, { email, phone, password, name, address, kelurahan, kecamatan, city, province, postal_code, birthdate, gender }) {
        const index = this._users.findIndex((user) => user.id === id);

        if (index === -1) {
            throw new NotFoundError('Failed to edit User. Id doesnt exist');
        }

        const updatedAt = new Date().toISOString();

        this._users[index] = {
            ...this._users[index],
            email,
            phone,
            password,
            name,
            address,
            kelurahan,
            kecamatan,
            city,
            province,
            postal_code,
            birthdate,
            gender,
            updatedAt
        };
    }

    deleteUserById(id) {
        const index = this._users.findIndex((user) => user.id === id);

        if (index === -1) {
            throw new NotFoundError('Failed to delete User. Id doesnt exist');
        }

        this._users.splice(index, 1);
    }
}

module.exports = UsersService;