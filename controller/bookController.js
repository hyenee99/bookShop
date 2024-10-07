const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken'); //jwt 모듈
const crypto = require('crypto'); // crypto 모듈 : 암호화
const dotenv = require('dotenv'); //dotenv 모듈
dotenv.config();

// ( 카테고리 별 , 신간 여부) 전체 도서 목록 조회
const allBooks = (req, res) => {
  let { category_id, news, limit, currentPage} = req.query;
  // limit : page 당 도서 수
  // currentPage: 현재 몇 페이지 ex.1,2,3
  // offset: limit * (currentPage - 1)
  let offset = limit * (currentPage - 1);

  let sql = "SELECT * FROM books LIMIT ? OFFSET ?";
  let values = [parseInt(limit), offset];

  if (category_id && news) {
    sql += " WHERE category_id =? AND pub_date BETWEEN DATE_SUB(NOW(),INTERVAL 1 MONTH) AND NOW()";
    values.push(category_id, news);
  }
  else if (category_id) {
    sql += " WHERE category_id =?";
    values.push(category_id);
  }
  else if (news) {
    sql += " WHERE pub_date BETWEEN DATE_SUB(NOW(),INTERVAL 1 MONTH) AND NOW()";
  }

  conn.query(sql, values,
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
};

// 개별 도서 조회
const bookDetail = (req, res) => {
  let { id } = req.params;
  let sql = `SELECT * FROM Bookshop.books LEFT JOIN category ON books.category_id = category.id WHERE books.id=?`;

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