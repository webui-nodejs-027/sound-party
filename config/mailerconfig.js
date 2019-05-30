const credentials = {
  user: 'noreplywebui@gmail.com',
  pass: 'abc123mde856',
};

const transporter = {
  service: 'gmail',
  auth: credentials,
};

const message = {
  from: '"no-reply"<noreplywebui@gmail.com>',
  to: null,
  subject: null,
  text: null,
};

module.exports = {
  transporter,
  message,
};
