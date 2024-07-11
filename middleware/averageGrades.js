const averageGrades = (req, res, next) => {
    const { grades } = req.body;

    if (grades && Array.isArray(grades)) {
        const gradeMap = {};

        grades.forEach(grade => {
            if (gradeMap[grade.code]) {
                gradeMap[grade.code].total += grade.value;
                gradeMap[grade.code].count += 1;
            } else {
                gradeMap[grade.code] = { total: grade.value, count: 1 };
            }
        });

        req.body.grades = Object.keys(gradeMap).map(code => ({
            code,
            value: gradeMap[code].total / gradeMap[code].count
        }));
    }

    next();
};

module.exports = averageGrades;
