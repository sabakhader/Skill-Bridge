exports.createCourse = (req, res) => {
  const { title, description, price, creator_id } = req.body;
  db.query('INSERT INTO courses (title, description, price, creator_id) VALUES (?, ?, ?, ?)',
    [title, description, price, creator_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ msg: 'Course added' });
    });
};