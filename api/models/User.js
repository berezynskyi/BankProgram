/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	id : {type :'string', unique:true},
  	name : {type :'string', required: true},
  	email : {type :'email', required:true, unique:true},
  	encryptedPassword : {type: 'string', required:true},
  	online : {type: 'string'}
  }
};

