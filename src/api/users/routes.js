const routes = (handler) => [
    {
        method: 'POST',
        path: '/register',
        handler: handler.postUserHandler,
        options: {
            auth: 'nakesapp_jwt',
        },
    },
    {
        method: 'GET',
        path: '/users',
        handler: handler.getUsersHandler,
        options: {
            auth: 'nakesapp_jwt',
        },
    },
    {
        method: 'GET',
        path: '/users/{id}',
        handler: handler.getUserByIdHandler,
        options: {
            auth: 'nakesapp_jwt',
        },
    },
    {
        method: 'PUT',
        path: '/users/{id}',
        handler: handler.putUserByIdHandler,
        options: {
            auth: 'nakesapp_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        handler: handler.deleteUserByIdHandler,
        options: {
            auth: 'nakesapp_jwt',
        },
    },
];

module.exports = routes;