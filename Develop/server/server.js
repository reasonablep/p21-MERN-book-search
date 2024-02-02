const express = require('express');
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers')
const { ApolloServer } = require('@apollo/server');
const { authMiddleware } = require('./utils/auth');
const { expressMiddleware } = require('@apollo/server/express4');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer ({
  typeDefs,
  resolvers
});


const StartApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());  

  app.use('/graphql', expressMiddleware(server, {context: authMiddleware }));


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on http://localhost:${PORT}`));
});
}

StartApolloServer();