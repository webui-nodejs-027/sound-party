const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const { M_SECRET: secret } = require('../constants');

const {
  domain,
  transporter: transpConf,
  messageConfig,
} = require('../../config/mailerconfig');

const {
  confirmTemplate,
  resetPasswordTemplate,
  newPasswordTemplate,
} = require('../mail_templates');

const transporter = nodemailer.createTransport(transpConf);

module.exports.sendConfirmation = async (id, email) => {
  const payload = {
    id,
  };
  const token = jwt.sign(payload, secret, { expiresIn: 10 * 60 });
  const address = `${domain}/api/users/reg/userconfirm/${token}`;
  messageConfig.to = email;
  messageConfig.subject = 'Sound party email confirmation';
  messageConfig.text = `
  To confirm your email click on:
  ${address}`;
  messageConfig.html = confirmTemplate(email, address);
  await transporter.sendMail(messageConfig);
  return { messageConfig: 'ok' };
};

module.exports.sendResetLink = async (id, email) => {
  const payload = {
    id,
    email,
  };
  const token = jwt.sign(payload, secret, { expiresIn: 10 * 60 });
  const address = `${domain}/api/users/passwordreset/${token}`;
  messageConfig.to = email;
  messageConfig.subject = 'Sound party password reset';
  messageConfig.text = `
  To reset password click on link:
  ${address}`;
  messageConfig.html = resetPasswordTemplate(email, address);
  await transporter.sendMail(messageConfig);
  return { message: 'ok' };
};

module.exports.sendPassword = async (email, password) => {
  messageConfig.to = email;
  messageConfig.subject = 'Sound party new password';
  messageConfig.text = `
  New password:
  ${password}`;
  messageConfig.html = newPasswordTemplate(password);
  await transporter.sendMail(messageConfig);
  return { message: 'ok' };
};

module.exports.verifyToken = token => jwt.verify(token, secret);
