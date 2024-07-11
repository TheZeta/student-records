const { body, validationResult } = require('express-validator');

const validateRecord = [
  body('name')
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('Name must contain only letters and spaces')
    .notEmpty()
    .withMessage('Name is required'),
  body('surname')
    .isAlpha('en-US', { ignore: ' ' })
    .withMessage('Surname must contain only letters and spaces')
    .notEmpty()
    .withMessage('Surname is required'),
  body('stdNumber')
    .matches(/^B\d{3}X\d{5}$/)
    .withMessage('Student number must follow the pattern B###X#####')
    .exists()
    .withMessage('A student record with the same student number already exists')
    .notEmpty()
    .withMessage('Student number is required'),
  body('grades').isArray().withMessage('Grades must be an array'),
  body('grades.*.code')
    .matches(/^[A-Z]{2}\d{3}$/)
    .withMessage('Course code must follow the pattern XX###')
    .notEmpty()
    .withMessage('Course code is required'),
  body('grades.*.value')
    .isInt({ min: 0, max: 100 })
    .withMessage('Grade value must be an integer between 0 and 100')
    .notEmpty()
    .withMessage('Grade value is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateRecord;
