export const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    users: async () => {
      // Mocked data, replace with DB calls
      return [
        { id: "1", name: "John Doe", email: "john@example.com" },
        { id: "2", name: "Jane Smith", email: "jane@example.com" },
      ];
    },
  },
  Mutation: {
    createUser: async (_: any, args: { name: string; email: string }) => {
      const newUser = {
        id: Math.random().toString(),
        ...args,
      };
      // Replace with DB call to create user
      return newUser;
    },
  },
};
