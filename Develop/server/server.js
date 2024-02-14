const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/connection');
const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers')
const { ApolloServer } = require('@apollo/server');
const { authMiddleware } = require('./utils/auth');
const { expressMiddleware } = require('@apollo/server/express4');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer ({
  context : authMiddleware,
  typeDefs,
  resolvers,
});

const StartApolloServer = async () => {
  await server.start();

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());  

  app.use('/graphql', expressMiddleware(server));


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on http://localhost:${PORT}`));
});
}

StartApolloServer();