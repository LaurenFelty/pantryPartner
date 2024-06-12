const Session = require('../models/sessionModel');

const sessionController = {};

/**
* isLoggedIn - find the appropriate session for this request in the database, then
* verify whether or not the session is still valid.
*/
sessionController.isLoggedIn = (req, res, next) => {
  if(!res.locals.ssid) return next()
  // const { ssid } = res.locals
  // // console.log('ssid: ', ssid)
  // Session.find({cookieId: ssid})
  //   .then(data => {
  //     // console.log('data in the session find: ', data[0])
  //     if(!data[0]) {
  //       res.locals.time = undefined
  //       return next()
  //     }
  //     return next()
  //   })
  //   .catch(err => next(err))


  
  const { ssid } = res.locals
  if(!res.locals.time) {
    clearInterval(myInterval)
    return next()
  }
  const currentTime = new Date();
  // check to see if the cookie has exprired 
  if (res.locals.time < currentTime) {
    delete res.locals.time 
    return next()
  }

  const myInterval = setInterval(this.isLoggedIn(), 30000);
  //else session is current so they can stay at secret page
};

/**
* startSession - create and save a new Session into the database.
*/
sessionController.startSession = (req, res, next) => {
  if(!res.locals.ssid) return next()
  const { ssid } = res.locals
  Session.create({cookieId : ssid}, (err, session) => {
    //conditional statement to check error
    // res.locals.session = true;
    if (err) {
      return next({
        log: 'Error with login',
        message: { err: 'Error with username or password' },
      });
    } else {
      // console.log('startsession: ', session)
      res.locals.time = session.createdAt
      return next();
    }


  });
  
};

module.exports = sessionController;
