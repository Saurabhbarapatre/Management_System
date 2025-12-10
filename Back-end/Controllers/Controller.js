import db from "../DB.js";

// Get post

const getpost = (req, res) => {
  db.query("SELECT * FROM management_table", (err, result) => {
    if (err) {
      return res.json({ message: "Unable to get employess" });
    } else {
      res.json(result);
    }
  });
};

// Add employee

const createpost = (req, res) => {
  const { name, age, city } = req.body;

  const sql = "INSERT INTO management_table (name,age,city) VALUES(?,?,?)";

  const values = [name, age, city];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ error: err });
    } else {
      res.json({ message: "Success" });
    }
  });
};

// Delete

const deletepost = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM management_table WHERE id=?", [id], (err, result) => {
    if (err) {
      return res.json({ error: err });
    } else {
      res.json({ message: "Deleted" });
    }
  });
};

// Update

const Updatedata = (req, res) => {
  const { id } = req.params;
  const { name, age, city } = req.body;
  const values = [name, age, city, id];

  const sql = "UPDATE management_table SET name=?,age=?,city=? WHERE id=? ";

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.json({ error: err });
    } else {
      res.json({ message: "Updated" });
    }
  });
};

export default { getpost, createpost, deletepost, Updatedata };
