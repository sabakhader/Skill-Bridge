const db = require('../config/db');

exports.addMentor = (req, res) => {
  const { user_id, bio, expertise } = req.body;
  const sql = 'INSERT INTO mentors (user_id, bio, expertise) VALUES (?, ?, ?)';
  db.query(sql, [user_id, bio, expertise], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Mentor added successfully' });
  });
};

exports.getMentors = (req, res) => {
  db.query('SELECT * FROM mentors', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
