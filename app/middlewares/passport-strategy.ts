/**
 * Passport Strategy
 *
 *  Define a strategy for passport
 */
 var passport = require('passport');
 var passportJWT = require('passport-jwt');
 
 var ExtractJwt = passportJWT.ExtractJwt;
 var JwtStrategy = passportJWT.Strategy;
 var jwtOptions:any = {};
 jwtOptions.jwtFromRequest = ExtractJwt.fromHeader('x-auth-token');
 jwtOptions.secretOrKey = process.env.SECRET_KEY;
 var schema :any = {
     user: {},
 };
 
 var strategy = new JwtStrategy(jwtOptions, function (_payload:any, _next:any) {
     var done = false;
     if ((_payload.phone || _payload.email) && _payload._id) {
         done = true;
     }
     if (done) {
         schema.user._id = _payload._id;
         schema.user.phone = _payload.phone;
         schema.user.name = _payload.name;
         schema.user.is_customer = _payload.is_customer;
         schema.user.is_merchant = _payload.is_merchant;
         schema.user.customer_order = _payload.customer_order;
         schema.user.merchant_id = _payload.merchant_id;
         schema.user.merchant_type = _payload.merchant_type;
         schema.user.phone_verified = _payload.phone_verified;
         schema.user.email = _payload.email;
         schema.user.email_verified = _payload.email_verified;
         schema.user.profile_picture = _payload.profile_picture;
         schema.user.birthdate = _payload.birthdate;
         schema.user.gender = _payload.gender;
         _payload.profile_completion_status && (schema.user.profile_completion_status = _payload.profile_completion_status);
         schema.user.need_change_password = _payload.need_change_password;
         schema.user.type = _payload.type;
         _next(null, schema.user);
     } else {
         _next(null, false);
     }
 });
 
 passport.use(strategy);
 
 module.exports = {
     'strategy': strategy,
     'jwtOptions': jwtOptions,
 };
 