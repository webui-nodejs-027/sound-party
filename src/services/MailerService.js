const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const { M_SECRET: secret } = require('../constants/');

const {
  transporter: transpConf,
  message
} = require('../../config/mailerconfig');

const transporter = nodemailer.createTransport(transpConf);

module.exports.sendConfirmation = async (id, email) => {
  const payload = {
    id
  };
  const token = jwt.sign(payload, secret, { expiresIn: 10 * 60 });
  const address = `http://localhost:3000/api/users/reg/userconfirm/${token}`;
  message.to = email;
  message.subject = 'Sound party email confirmation';
  message.text = `
  To confirm your email click on:
  ${address}`;
  await transporter.sendMail(message);
  return { message: 'ok' };
};

module.exports.verifyToken = token => jwt.verify(token, secret);
