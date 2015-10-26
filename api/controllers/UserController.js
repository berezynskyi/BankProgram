/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	userpage: function (req, res) {
		console.log(1)
      if (req.session.authenticated){
        res.json({authenticated:req.session.authenticated});
        return;
      }
    // Try to look up user using the provided email address
    console.log('asd');
    console.log(req.param('email'));
    User.findOne({
      email: req.param('email')
    }, function foundUser(err, user) {
    	console.log(1.2);
    	console.log(user);
      if (err) { 
      	console.log(1.5);
      	return res.negotiate(err); 
      };
      if (!user) { 
      	console.log(2);
      	return res.notFound(); 
      }
      console.log(3);
      // Compare password attempt from the form params to the encrypted password
      // from the database (`user.password`)
      require('machinepack-passwords').checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({

        error: function (err){
          console.log(4);
          return res.negotiate(err);
        },

        // If the password from the form params doesn't checkout w/ the encrypted
        // password from the database...
        incorrect: function (){
          console.log(5);
          return res.notFound();
        },

        success: function (){

          // Store user id in the user session
          req.session.me = user.id;
          req.session.authenticated = true;
          user.online = req.session.authenticated;
         // var authenticated = true;

          // All done- let the client know that everything worked.
          console.log(6);
          //return res.ok({authenticated:'true'});
          return res.json({
                user: user
              });;

        }
      });
    });

  },
 
logout: function (req, res) {
    User.findOne({
      email: req.param('email')
    }, function foundUser(err, user) {
      console.log(1.2);
      console.log(user);
          req.session.me = null;
          req.session.authenticated = false;
          user.online = req.session.authenticated;
         // var authenticated = true;

          // All done- let the client know that everything worked.
          console.log('offline');
          //return res.ok({authenticated:'true'});
          return res.json({
                user: user
              });;
      })
  },

  signup: function(req,res){

    var Passwords = require('machinepack-passwords');

    // Encrypt a string using the BCrypt algorithm.
    Passwords.encryptPassword({
      password: req.param('password'),
      difficulty: 10,
    }).exec({
      // An unexpected error occurred.
      error: function(err) {
        return res.negotiate(err);
      },
      // OK.
      success: function(encryptedPassword) {
            // Create a User with the params sent from
            // the sign-up form --> signup.ejs
            User.create({
              name: req.param('name'),
              email: req.param('email'),
              encryptedPassword: encryptedPassword,
              online: req.param('online')
            }, function userCreated(err, newUser) {
              if (err) {
                console.log(1);
                console.log("err: ", err);
                console.log("err.invalidAttributes: ", err.invalidAttributes);
                console.log(2);
                // If this is a uniqueness error about the email attribute,
                // send back an easily parseable status code.
                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0]
                  && err.invalidAttributes.email[0].rule === 'unique') {
                  return res.emailAddressInUse();
                }
                console.log(3);
                // Otherwise, send back something reasonable as our error response.
                return res.negotiate(err);
              }

              //// Log user in
              //req.session.me = newUser.id;

              // Send back the id of the new user
              return res.json({id: newUser.id});
            });
          }
    });
  }
};

