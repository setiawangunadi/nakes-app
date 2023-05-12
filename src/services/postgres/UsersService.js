const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const bcrypt = require('bcrypt');
const InvariantError = require("../../exceptions/InvariantError");
const { mapDBToModel } = require('../../utils');
const NotFoundError = require("../../exceptions/NotFoundError");

class UsersService {
    constructor() {
        this._pool = new Pool();
    }

    async verifyNewEmail(email) {
        const query = {
            text: 'SELECT email FROM users WHERE email = $1',
            values: [email],
        };

        const result = await this._pool.query(query);

        if (result.rows.length > 0) {
            throw new InvariantError('Failed to add User. Username already used');
        }
    }

    async addUser({email, phone, password, name, address, kelurahan, kecamatan, city, province, postal_code, birthdate, gender}) {
        // await this._pool.verifyNewEmail(email);

        const id = `user-${nanoid(16)}`;
        const hashedPassword = await bcrypt.hash(password, 10);
        // const birthdate = new Date().toISOString();
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        const role = 1;

        const query = {
            text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id',
            values: [id, role, email, phone, hashedPassword, name, address, kelurahan, kecamatan, city, province, postal_code, birthdate, gender, createdAt, updatedAt],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Users failed to added');
        }

        return result.rows[0].id;
    }

    async getUsers() {
        const result = await this._pool.query('SELECT * FROM users');
        return result.rows.map(mapDBToModel);
    }

    async getUserById(id) {
        const query = {
            text: 'SELECT * FROM users WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Users doesnt exist');
        }

        return result.rows.map(mapDBToModel)[0];
    }

    async editUserById(id, { email, phone, password, name, address, kelurahan, kecamatan, city, province, postal_code, birthdate, gender }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE users SET email = $1, phone = $2, password = $3, name = $4, address = $5, kelurahan = $6, kecamatan = $7, city = $8, province = $9, postal_code = $10, birthdate = $11, gender = $12 WHERE id = $13 RETURNING id',
            values: [email, phone, password, name, address, kelurahan, kecamatan, city, province, postal_code, birthdate, gender, id]
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Failed edited user. Id doesnt exist');
        }
    }

    async deleteUserById(id) {
        const query = {
            text: 'DELETE FROM users WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Users failed to delete. Id doesnt exist');
        }
    }
}

module.exports = UsersService;