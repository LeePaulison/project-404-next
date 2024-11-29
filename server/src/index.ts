import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config";

import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

const port = process.env.PORT || 4000;

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
