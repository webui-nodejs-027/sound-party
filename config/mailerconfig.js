const credentials = {
  user: 'noreplywebui@gmail.com',
<<<<<<< HEAD
  pass: 'jesvucfiijkmeqme',
=======
  pass: 'wcxxthdljeockuml',
>>>>>>> defdca8f60d1cc9046dfb563d655832077b89bb8
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
