const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');

// 카테고리 전체 목록 조회
const allCategory = (req, res) => {
  let sql = `SELECT * FROM category`;
  conn.query(sql,
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).json(results);
    }
  )

};

module.exports = { allCategory };