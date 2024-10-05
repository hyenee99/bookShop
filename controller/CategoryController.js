const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken'); //jwt 모듈
const crypto = require('crypto'); // crypto 모듈 : 암호화
const dotenv = require('dotenv'); //dotenv 모듈
dotenv.config();

const allCategory = (req, res) => {

  // 카테고리 전체 목록 조회
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