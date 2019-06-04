const credentials = {
  user: 'noreplywebui@gmail.com',
  pass: 'abc123mde856',
};

const domain = 'http://localhost:3000';

const transporter = {
  service: 'gmail',
  auth: credentials,
};

const messageConfig = {
  from: '"no-reply"<noreplywebui@gmail.com>',
};

module.exports = {
  domain,
  transporter,
  messageConfig,
};
