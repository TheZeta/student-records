const Record = require('../models/Record');

const createRecord = async (req, res) => {
  const { name, surname, stdNumber, grades } = req.body;

  try {
    const newStudent = await Record.create({
      name,
      surname,
      stdNumber,
      grades
    });

    res.status(201).json({
      message: 'Student record created successfully',
      student: newStudent
    });
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: error.message });
  }
};

module.exports = createRecord;
