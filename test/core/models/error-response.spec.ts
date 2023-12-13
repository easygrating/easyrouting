import { StatusCodes } from 'http-status-codes';
import { ErrorResponse } from '../../../src/core/models/error-response';

describe('ErrorResponse', () => {
    it('should create an error response with the correct properties', () => {
        const errors = ['Name is required'];
        const message = 'Invalid input';
        const errorResponse = ErrorResponse.badRequest(message, errors);

        expect(errorResponse.responseType).toBe('error');
        expect(errorResponse.statusCode).toBe(StatusCodes.BAD_REQUEST);
        expect(errorResponse.message).toBe(message);
        expect(errorResponse.errors).toEqual(errors);
    });
});
