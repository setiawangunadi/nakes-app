const { Pool } = require("pg");
const bcrypt = require('bcrypt');
const InvariantError = require("../../exceptions/InvariantError");
const AuthenticationError = require("../../exceptions/AuthenticationError");

class AuthenticationsService {
    constructor() {
        this._pool = new Pool();
    }

    async addRefreshToken(token) {
        const query = {
            text: 'INSERT INTO authentications VALUES($1)',
            values: [token],
        };

        await this._pool.query(query);
    }

    async verifyRefreshToken(token) {
        const query = {
            text: 'SELECT token FROM authentications WHERE token = $1',
            values: [token],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Refresh Token Invalid');
        }
    }

    async deleteRefreshToken(token) {
        const query = {
            text: 'DELETE FROM authentications WHERE token = $1',
            values: [token],
        };

        await this._pool.query(query);
    }

    async verifyUserCredential(email, password) {
        const query = {
            text: 'SELECT id, password FROM users WHERE email = $1',
            values: [email],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new AuthenticationError("Password Isn't match");
        }

        const { id, password: hashedPassword } = result.rows[0];

        const match = await bcrypt.compare(password, hashedPassword);

        if (!match) {
            throw new AuthenticationError("Password Isn't Match");
        }

        return id;
    }
}

module.exports = AuthenticationsService;