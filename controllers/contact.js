const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: process.env.MAILERDOMAIN,
  port: process.env.MAILERPORT,
  auth: {
    user: process.env.NWGSEND_USER,
    pass: process.env.NWGSEND_PASSWORD
  },
  secure:false,
  tls: {rejectUnauthorized: false},
  debug:true
});

/*
const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASSWORD
  }
});
*/

/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = (req, res) => {
  res.render('contact', {
    title: 'Contact'
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postContact = (req, res) => {
  req.assert('name', 'שם לא יכול להיות ריק').notEmpty();
  req.assert('email', 'כתובת מייל לא תקינה').isEmail();
  req.assert('message', 'לא ניתן לשלוח הודעה ריקה').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/contact');
  }

  const mailOptions = {
    to: 'judmojo@gmail.com',
    from: `${req.body.name} <${req.body.email}>`,
    subject: 'טופס יצירת קשר | eatOrganic',
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      req.flash('errors', { msg: err.message });
      return res.redirect('/contact');
    }
    req.flash('success', { msg: 'המייל נשלח בהצלחה!' });
    res.redirect('/contact');
  });
};
