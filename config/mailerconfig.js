const credentials = {
  user: 'noreplywebui@gmail.com',
  pass: 'jesvucfiijkmeqme',
};

const domain = 'http://localhost:3001';

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
