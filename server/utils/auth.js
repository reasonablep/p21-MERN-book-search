const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization || req.body.token;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return { user: null, error: 'No token provided' }
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      console.log(data);
      return { user: data }
  
    } catch (error) {
      console.log('Invalid token', error.message);
    }
    return { user: null, error: 'Invalid token' }

  },
  
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};