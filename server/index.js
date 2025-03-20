import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'dotenv/config';
import { typeDefs } from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';
import connectDB from './db/connect.js';

import cors from 'cors'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { env } from 'process';
import route from './routes/index.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));

// Enable CORS for all routes
app.use(cors());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    // Start Apollo Server first
    await apolloServer.start();
    
    // Apply Apollo middleware
    apolloServer.applyMiddleware({ app: app });
    
    // Apply Express routes
    route(app);
    
    // app.use(cors({ origin: 'http://localhost:3000' }));
    // Handle React routes
    app.get('*', function (req, res) {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });

    // Connect to database
    await connectDB(process.env.MONGO_URL);
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`GraphQL endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`);
    });
  } catch (error) {
    throw new Error(error);
  }
};

startServer();
