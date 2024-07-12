const averageGrades = require('../middleware/averageGrades');

describe('averageGrades Middleware', () => {
    it('should average out multiple instances of the same course code', () => {
        const req = {
            body: {
                grades: [
                    { code: 'MT101', value: 90 },
                    { code: 'PH101', value: 75 },
                    { code: 'CH101', value: 60 },
                    { code: 'MT101', value: 70 },
                    { code: 'HS101', value: 65 }
                ]
            }
        };
        const res = {};
        const next = jest.fn();

        averageGrades(req, res, next);

        expect(req.body.grades).toEqual([
            { code: 'MT101', value: 80 },
            { code: 'PH101', value: 75 },
            { code: 'CH101', value: 60 },
            { code: 'HS101', value: 65 }
        ]);
        expect(next).toHaveBeenCalled();
    });

    it('should handle empty grades array', () => {
        const req = { body: { grades: [] } };
        const res = {};
        const next = jest.fn();

        averageGrades(req, res, next);

        expect(req.body.grades).toEqual([]);
        expect(next).toHaveBeenCalled();
    });

    it('should handle missing grades field', () => {
        const req = { body: {} };
        const res = {};
        const next = jest.fn();

        averageGrades(req, res, next);

        expect(req.body.grades).toBeUndefined();
        expect(next).toHaveBeenCalled();
    });

    it('should handle non-array grades field', () => {
        const req = { body: { grades: 'invalid' } };
        const res = {};
        const next = jest.fn();

        averageGrades(req, res, next);

        expect(req.body.grades).toBe('invalid');
        expect(next).toHaveBeenCalled();
    });
});
