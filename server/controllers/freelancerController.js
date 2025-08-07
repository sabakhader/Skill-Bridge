exports.postService = (req, res) => {
  const { title, description, user_id } = req.body;
  db.query('INSERT INTO services (title, description, user_id) VALUES (?, ?, ?)',
    [title, description, user_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ msg: 'Service posted' });
    });
};