/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const sass = require('node-sass-middleware');
const multer = require('multer');
const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.configs' });

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const userController = require('./controllers/user');
const orderController = require('./controllers/order')
//const apiController = require('./controllers/api');
const contactController = require('./controllers/contact');
const storeController = require('./controllers/store');
const productsController = require('./controllers/api/products');
const transController = require('./controllers/api/paypal');
const ordersController = require('./controllers/api/orders');
const cartsController = require('./controllers/carts');

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const server = express();

/**
 * add local momntjs
 * https://coderwall.com/p/egh53a/making-use-of-utility-libraries-in-server-side-jade-templates
 */
server.locals.moment = require('moment');

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
/*
 * Allow CORS REST request to a Express/Node.js application on Heroku
 * http://stackoverflow.com/questions/11001817/allow-cors-rest-request-to-a-express-node-js-application-on-heroku
 */
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Authorization, Content-Length, X-Requested-With');
  // "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
};
server.use(allowCrossDomain);
/**
 * Express configuration.
 */
server.set('port', process.env.PORT || 3000);
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');
server.use(compression());
server.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
server.use(logger('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(expressValidator());
server.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    url: process.env.MONGODB_URI || process.env.MONGOLAB_URI,
    autoReconnect: true
  })
}));
server.use(passport.initialize());
server.use(passport.session());
server.use(flash());
server.use((req, res, next) => {
  //if ((req.path === '/api/upload') || (/^\/store/.test(req.originalUrl))) {
  if ((req.path === '/api/upload') || (/^\/api/.test(req.originalUrl))) {
    //console.log("req.originalUrl " + req.originalUrl);
    next();
  /*} else if ((/^\/store/.test(req.originalUrl))) {
    console.log("req.originalUrl " + req.originalUrl);*/
    //lusca.csrf()(req, res, next);
    //lusca.csrf.getCsrf(res, process.env.SESSION_SECRET)
    //console.log("Lusca SERVER " + defaultValue(req))
  } else {
    //console.log("REQ PATH: " + req.path);
    lusca.csrf()(req, res, next);
  }
});

var opts = { csrf: { angular: true } }; // options for lusca

server.use(lusca({
  csrf: {key: "_csrf", header: "x-xsrf-token"},
  xframe: "SAMEORIGIN",
  csp: false,
  p3p: false,
  hsts: false,
  xssProtection: true,
  nosniff: true
}));
server.use(lusca(opts)); // lusca registered AFTER cookieParser
server.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
server.use(function(req, res, next) {
  // After successful login, redirect back to the intended page
  if (!req.user &&
      req.path !== '/login' &&
      req.path !== '/signup' &&
      !req.path.match(/^\/auth/) &&
      !req.path.match(/\./)) {
      console.log(req.path);
    req.session.returnTo = req.path;
  }
  next();
});
server.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Primary server routes.
 */
server.get('/', homeController.index);
server.get('/login', userController.getLogin);
server.post('/login', userController.postLogin);
server.get('/logout', userController.logout);
server.get('/forgot', userController.getForgot);
server.post('/forgot', userController.postForgot);
server.get('/reset/:token', userController.getReset);
server.post('/reset/:token', userController.postReset);
server.get('/signup', userController.getSignup);
server.post('/signup', userController.postSignup);
server.get('/contact', contactController.getContact);
server.post('/contact', contactController.postContact);
server.get('/account', passportConfig.isAuthenticated, userController.getAccount);
server.get('/orders', passportConfig.isAuthenticated, orderController.getOrders);
server.get('/carts', passportConfig.isAuthenticated, cartsController.getCarts);
server.post('/carts', passportConfig.isAuthenticated, cartsController.pushCart);

server.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
server.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
server.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
server.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);
server.get('/store', passportConfig.isAuthenticated, storeController.getStorePage);
server.get('/cart', passportConfig.isAuthenticated, storeController.getCartPage);
server.get('/products/:sku', passportConfig.isAuthenticated, storeController.getProductPage);
server.get('/store/product', passportConfig.isAuthenticated, storeController.getProductPage);
//server.use('/api/products/', passportConfig.isAuthenticated, productsController);
server.use('/api/products/', productsController);
server.use('/api/products/:sku', passportConfig.isAuthenticated, productsController);
// PayPal GET transaction
server.use('/api/paypal', transController);
/*server.get('/api/paypal/', transController);
server.post('/api/paypal', transController);*/

server.post('/api/orders', passportConfig.isAuthenticated, ordersController.insertItems);

/**
 * OAuth authentication routes. (Sign in)
 */
server.get('/auth/instagram', passport.authenticate('instagram'));
server.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), (req, res) => {
  //res.redirect(req.session.returnTo || '/');
  res.redirect('/store');
});
server.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location'] }));
server.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  /*res.redirect(req.session.returnTo || '/');*/
  res.redirect('/store');
});
server.get('/auth/github', passport.authenticate('github'));
server.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  //res.redirect(req.session.returnTo || '/');
  res.redirect('/store');
});
server.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
server.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  //res.redirect(req.session.returnTo || '/');
  res.redirect('/store');
});
server.get('/auth/twitter', passport.authenticate('twitter'));
server.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
  //res.redirect(req.session.returnTo || '/');
  res.redirect('/store');
});
server.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
server.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
  //res.redirect(req.session.returnTo || '/');
  res.redirect('/store');
});

/**
 * Error Handler.
 */
server.use(errorHandler());

/**
 * Start Express server.
 */
server.listen(server.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', server.get('port'), server.get('env'));
});

module.exports = server;
