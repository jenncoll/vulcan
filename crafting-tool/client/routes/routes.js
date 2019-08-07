module.exports = {
  getHomePage: (req, res) => {
    let query = "SELECT * FROM tblCraft"; // query database to get all the players

    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.send({ express: 'I failed the DB' });
      }
      console.log(result)
      res.send({express: 'I succeeded'})
    });
  },
};