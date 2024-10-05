const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken'); //jwt 모듈
const crypto = require('crypto'); // crypto 모듈 : 암호화
const dotenv = require('dotenv'); //dotenv 모듈
dotenv.config();

// 전체 도서 조회
const allBooks = (req, res) => {
  let { category_id } = req.query;

  if (category_id) {
    let sql = `SELECT * FROM books WHERE category_id =?`;

    conn.query(sql, category_id,
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(StatusCodes.BAD_REQUEST).end();
        }
        if (results.length)
          return res.status(StatusCodes.OK).json(results);
        else
          return res.status(StatusCodes.NOT_FOUND).end();
      }
    )
  }
  else {
    let sql = `SELECT * FROM books`;
    conn.query(sql,
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(StatusCodes.BAD_REQUEST).end();
        }
        return res.status(StatusCodes.OK).json(results);
      }
    )
  }
};

const bookDetail = (req, res) => {
  let { id } = req.params;
  let sql = `SELECT * FROM books WHERE id =?`;

  conn.query(sql, id,
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      if (results.length)
        return res.status(StatusCodes.OK).json(results[0]);
      else
        return res.status(StatusCodes.NOT_FOUND).end();
    }
  )
};

module.exports = { allBooks, bookDetail };