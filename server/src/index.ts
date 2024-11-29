import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config";

const port = process.env.PORT || 4000;

// Sample type definitions
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// Sample resolvers
const resolvers = {
  Query: {
    hello: () => "Hello, world!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(port) },
  });
  console.log(`🚀 Server ready at ${url}`);
};

startServer().catch((error) => {
  console.error("Error starting server:", error);
});
