require('dotenv').config();

const Hapi = require('@hapi/hapi');
const routes = require('./api/auth/routes');
const users = require('./api/auth');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const init = async () => {
    const usersService = new UsersService();
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        // host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    // server.route(routes);

    await server.register({
        plugin: users,
        options: {
            service: usersService,
            validator: UsersValidator,
        },
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();