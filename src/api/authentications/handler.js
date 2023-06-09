const ClientError = require("../../exceptions/ClientError");

class AuthenticationsHandler {
    constructor(authenticationsService, usersService, tokenManager, validator) {
        this._authentictaionsService = authenticationsService;
        this._usersService = usersService;
        this._tokenManager = tokenManager;
        this._validator = validator;

        this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
        this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
        this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
    }

    async postAuthenticationHandler(request, h) {
        try {
            this._validator.validatePostAuthenticationPayload(request.payload);

            const { email, password } = request.payload;
            const id = await this._authentictaionsService.verifyUserCredential(email, password);

            const accessToken = this._tokenManager.generateAccessToken({ id });
            const refreshToken = this._tokenManager.generateRefreshToken({ id });

            await this._authentictaionsService.addRefreshToken(refreshToken);

            const response = h.response({
                status: 'success',
                message: 'Authentication has been added',
                data: {
                    accessToken,
                    refreshToken,
                }
            });
            response.code(201);
            return response;
        } catch (error) {
            if (error instanceof ClientError) {
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            // Server ERROR!
            const response = h.response({
                status: 'error',
                message: 'Sorry, server unstable.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async putAuthenticationHandler(request, h) {
        try {
            this._validator.validatePutAuthenticationPayload(request.payload);

            const { refreshToken } = request.payload;
            await this._authentictaionsService.verifyRefreshToken(refreshToken);
            const { id } = this._tokenManager.verifyRefreshToken(refreshToken);

            const accessToken = this._tokenManager.generateAccessToken({ id });
            return {
                status: 'success',
                message: 'Access Token Has Been Updated',
                data : {
                    accessToken
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

            //SERVER ERROR
            const response = h.response({
                status: 'error',
                message: 'Sorry, Server Unstable',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async deleteAuthenticationHandler(request, h) {
        try {
            this._validator.validateDeleteAuthenticationPayload(request.payload);

            const { refreshToken } = request.payload;
            await this._authentictaionsService.verifyRefreshToken(refreshToken);
            await this._authentictaionsService.deleteRefreshToken(refreshToken);

            return {
                status: 'success',
                message: 'Refreh Token Has Been Deleted',
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

            //SERVER ERROR
            const response = h.response({
                status: 'error',
                message: 'Sorry, Server Unstable',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}

module.exports = AuthenticationsHandler;