const conn = require('../mariadb');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken'); //jwt 모듈
const dotenv = require('dotenv');
dotenv.config();

const join = (req, res) => {
  const { email, password } = req.body;
  let sql = `INSERT INTO users (email, password) VALUES (?,?)`;
  let values = [email, password];

  conn.query(sql, values,
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      return res.status(StatusCodes.CREATED).json(results);
    })
}

const login = (req, res) => {
  const { email, password } = req.body;
  let sql = `SELECT * FROM users WHERE email =? `;
  conn.query(sql, email,
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }

      const loginUser = results[0];
      if (loginUser && loginUser.password == password) {
        // 토큰 발행 
        const token = jwt.sign({
          email: loginUser.email
        }, process.env.PRIVATE_KEY, {
          expiresIn: '5m',
          issuer: "hyewon"
        });

        // 토큰 쿠키에 담기
        res.cookie("token", token, {
          httpOnly: true
        });
        console.log(token);

        return res.status(StatusCodes.OK).json(results);
      }
      else {
        return res.status(StatusCodes.UNAUTHORIZED).end();
      }
      
    })
};

const passwordResetRequest = (req, res) => {

};

const passwordReset = (req, res) => {

};

module.exports = { join, login, passwordResetRequest, passwordReset };