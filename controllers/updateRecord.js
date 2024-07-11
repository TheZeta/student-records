const Record = require('../models/Record');

const updateRecord = async (req, res) => {
    const { stdNumber } = req.params;
    const { name, surname, grades } = req.body;

    try {
        const record = await Record.findOne({ where: { stdNumber } });

        if (!record) {
            return res.status(404).json({ error: 'Student record not found' });
        }

        record.name = name;
        record.surname = surname;
        record.grades = grades;

        await record.save();

        res.status(200).json({
            message: 'Student record updated successfully',
            record: record
        });
    } catch (error) {
        res.status(500).json({ error: 'Database error', details: error.message });
    }
};

module.exports = updateRecord;
