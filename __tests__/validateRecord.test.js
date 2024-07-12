const { body, validationResult } = require('express-validator');
const validateRecord = require('../middleware/validateRecord');

const runMiddleware = (middlewares, req, res) => {
    return new Promise((resolve, reject) => {
        const next = (err) => {
            if (err) {
                return reject(err);
            }
            const middleware = middlewares.shift();
            if (middleware) {
                middleware(req, res, next);
            } else {
                resolve();
            }
        };
        next();
    });
};

describe('validateRecord Middleware', () => {
    it('should validate correct input data', async () => {
        const req = {
            method: 'POST',
            body: {
                name: 'John',
                surname: 'Doe',
                stdNumber: 'B012X00012',
                grades: [
                    { code: 'MT101', value: 90 },
                    { code: 'PH101', value: 75 }
                ]
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await runMiddleware([...validateRecord], req, res);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        } else {
            next();
        }

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should return errors for invalid input data', async () => {
        const req = {
            method: 'POST',
            body: {
                name: 'John123',
                surname: '',
                stdNumber: 'invalid',
                grades: [
                    { code: 'MT101', value: 150 }
                ]
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        await runMiddleware([...validateRecord], req, res);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        } else {
            next();
        }

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            errors: expect.arrayContaining([
                expect.objectContaining({ msg: 'Name must contain only letters and spaces' }),
                expect.objectContaining({ msg: 'Surname is required' }),
                expect.objectContaining({ msg: 'Student number must follow the pattern B###X#####' }),
                expect.objectContaining({ msg: 'Grade value must be an integer between 0 and 100' })
            ])
        });
        expect(next).not.toHaveBeenCalled();
    });
});
