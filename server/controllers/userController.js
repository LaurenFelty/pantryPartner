const User = require('../models/userModel');

const userController = {};

/**
 * getAllUsers - retrieve all users from the database and stores it into res.locals
 * before moving on to next middleware.
 */
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err)
      return next(
        'Error in userController.getAllUsers: ' + JSON.stringify(err)
      );

    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};

/**
 * createUser - create and save a new User into the database.
 */
userController.createUser = (req, res, next) => {
  const { username, password } = req.body;
  User.create({ username: username, password: password }, (err, user) => {
    //conditional statement to check error
    if (err) {
      return next({
        log: 'Error with login',
        message: { err: 'Error with username or password' },
      });
    } else {
      // console.log(user._id)
      //else the post is successful
      res.locals.ssid = user._id
      return next();
    }
  });
};

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 */
userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  User.find({ username: username, password: password })
    .then(data => {
      // console.log(data)
      if(!data[0]) return next()
      const ssid = data[0]._id;
      res.locals.ssid = ssid
      next()
    })
    // .then(data => {
    //   if(!data){
    //     res.locals.user = 'notFound' 
    //     return next()
    //   }
    // })
    .catch((err) => next(err));
};

module.exports = userController;
