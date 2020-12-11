const nodemailer = require('nodemailer');
var nodemailerSendgrid = require('nodemailer-sendgrid');
const hbs = require('nodemailer-express-handlebars');
module.exports = {
  friendlyName: 'Send mail',
  description: '',
  inputs: {
    options: {
      type: 'ref',
      required: true,
    },
  },
  exits: {
    success: {
      description: 'All done.',
    },
  },
  fn: async function (inputs,exits) {
    const transporter = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: sails.config.sendGridAPIKey || process.env.SENDGRID_API_KEY,
      })
    );
    transporter.use(
      'compile',
      hbs({
        viewEngine: {
          extName: '.hbs',
          partialsDir: './views',
          layoutsDir: './views',
          defaultLayout: '',
        },
        viewPath: './views/',
        extName: '.hbs',
      })
    );
    try {
      let emailOptions = {
        from: 'zambretriveni24@gmail.com',
        ...inputs.options,
      };
      await transporter.sendMail(emailOptions);
    } catch (error) {
      sails.log(error);
    }
  },
};
