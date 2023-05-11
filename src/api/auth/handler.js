const { nanoid } = require("nanoid");
const users = require('./users');
const ClientError = require("../../exceptions/ClientError");

class UsersHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        this.postUserHandler = this.postUserHandler.bind(this);
        this.getUsersHandler = this.getUsersHandler.bind(this);
        this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
        this.putUserByIdHandler = this.putUserByIdHandler.bind(this);
        this.deleteUserByIdHandler = this.deleteUserByIdHandler.bind(this);
    }

    async postUserHandler(request, h) {
        try {
            this._validator.validateUserPayload(request.payload);
            const { role, email, phone, password, name, address, kelurahan, kecamatan, city, province, postal_code, birthdate, gender } = request.payload;

            const userId = await this._service.addUser({role, email, phone, password, name, address, kelurahan, kecamatan, city, province, postal_code, birthdate, gender});
        
            const response = h.response({
                status: 'success',
                data: {
                    userId,
                },
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message
                });
                response.code(error.statusCode);
                return response;
            }

            const response = h.response({
                status: 'error',
                message: 'Sorry, Unstable Network Server',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async getUsersHandler() {
        const users = await this._service.getUsers();
        return {
            status: 'success',
            data: {
                users,
            },
        };
    }

    async getUserByIdHandler(request, h) {
        try {
            const { id } = request.params;
            const user = await this._service.getUserById(id);
            return {
                status: 'success',
                data: {
                    user,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                  status: 'fail',
                  message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            const response = h.response({
                status: 'error',
                message: 'Sorry, Unstable Network Server',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async putUserByIdHandler(request, h) {
        try {
            this._validator.validateUserPayload(request.payload);
            const { role, email, phone, password, name, address, kelurahan, kecamatan, city, province, postal_code, birthdate, gender } = request.payload; 
            const { id } = request.params;

            await this._service.editUserById(id, { role, email, phone, password, name, address, kelurahan, kecamatan, city, province, postal_code, birthdate, gender });
    
            return {
                status: 'success',
                message: 'User Successfully Edited',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                  status: 'fail',
                  message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            const response = h.response({
                status: 'error',
                message: 'Sorry, Unstable Network Server',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async deleteUserByIdHandler(request) {
        try {
            const { id } = request.params;
            await this._service.deleteUserById(id);
            return {
                status: 'success',
                message: 'User has been deleted',
            };
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                  status: 'fail',
                  message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            const response = h.response({
                status: 'error',
                message: 'Sorry, Unstable Network Server',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}

module.exports = UsersHandler;

// const addUserHandler = (request, h) => {
//     const { email, password } = request.payload;

//     const id = nanoid(16);
//     const role = 1;
//     const createdAt = new Date().toISOString();
//     const updatedAt = createdAt;

//     const newUser = {
//         email, password, role, id, createdAt, updatedAt, 
//     };

//     users.push(newUser);

//     const isSuccess = users.filter((user) => user.id === id).length > 0;

//     if (isSuccess){
//         const response = h.response({
//             status: 'success',
//             message: 'User berhasil ditambahkan',
//             data : {
//                 userId : id
//             },
//         });
//         response.code(201);
//         return response;
//     }

//     const response = h.response({
//         status: 'fail',
//         message: 'User gagal ditambahkan',
//     });
//     response.code(500);
//     return response;
// };

// const getAllUsersHandler = () => ({
//     status: 'success',
//     data: {
//       users,
//     },
// });

// const getUserByIdHandler = (request, h) => {
//     const { id } = request.params;

//     const user = users.filter((n) => n.id === id)[0];

//     if (user !== undefined) {
//         return {
//             status: 'success',
//             data : {
//                 user,
//             },
//         };
//     }

//     const response = h.response({
//         status: 'fail',
//         message: 'User tidak ditemukan',
//     });
//     response.code(404);
//     return response;
// };

// const editUserByIdHandler = (request, h) => {
//     const {id} = request.params;

//     const { email } = request.payload;
//     const updatedAt = new Date().toISOString();

//     const index = users.findIndex((user) => user.id === id);

//     if (index !== -1){
//         users[index] = {
//             ...users[index],
//             email,
//             updatedAt,
//         };

//         const response = h.response({
//             status: 'success',
//             message: 'User berhasil diperbarui',
//         });
//         response.code(200);
//         return response;
//     }

//     const response = h.response({
//         status: 'fail',
//         message: 'Gagal memperbarui user. Id tidak ditemukan',
//     });
//     response.code(404);
//     return response;
// };

// const deleteUserByIdHandler = (request, h) => {
//     const { id } = request.params;

//     const index = users.findIndex((user) => user.id === id);

//     if (index !== -1) {
//         users.splice(index, 1);
//         const response = h.response({
//             status: 'success',
//             message: 'User berhasil dihapus',
//         });
//         response.code(200);
//         return response;
//     }

//     const response = h.response({
//         status: 'fail',
//         message: 'User gagal dihapus. Id tidak ditemukan',
//     });
//     response.code(404);
//     return response;
// };

// module.exports = { 
//     addUserHandler, 
//     getAllUsersHandler, 
//     getUserByIdHandler,
//     editUserByIdHandler,
//     deleteUserByIdHandler
// };