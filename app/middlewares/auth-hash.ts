/**
 * authentication strategy
 *
 *
 */
 var secretOrKey = require('./passport-strategy').jwtOptions.secretOrKey;
 var jwt = require('jsonwebtoken');

 const TOKEN_EXPIRE =  process.env.TOKEN_EXPIRE;
 
 export const hashPassword = function(password:any, salt:any) {
   var crypto = require('crypto');
   return crypto.createHmac('sha512', salt).update(password).digest('hex');
 };
 
 export const tokenGenerator = function(payload:any) {
   delete payload['password'];
   delete payload['token'];
   return jwt.sign(payload, secretOrKey, {expiresIn: TOKEN_EXPIRE});
 };
 
 export const tokenRefreshor = function(token:any) {
   var payload = jwt.verify(token, secretOrKey);
   delete payload.iat;
   delete payload.exp;
   delete payload.nbf;
   delete payload.jti;
   return jwt.sign(payload, secretOrKey, {expiresIn: TOKEN_EXPIRE});
 };


 export const tokenVarify = function(token:any) {

  try {
    var payload = jwt.verify(token, secretOrKey);
    return payload
    
  } catch (error) {
    return error
  }

};
 

 