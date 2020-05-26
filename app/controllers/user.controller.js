exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.studentBoard = (req, res) => {
    res.status(200).send("Student Content.");
};

exports.academicBoard = (req, res) => {
    res.status(200).send("Academic Content.");
};

exports.nonacademicBoard = (req, res) => {
    res.status(200).send("Non-Academic Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
