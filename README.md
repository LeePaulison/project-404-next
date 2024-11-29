# Project 404

## Description
**Project 404** is a personal portfolio project showcasing a Gen-AI chatbot application built with modern web technologies. This project includes both a client and a server setup, featuring a Next.js front-end and an Apollo Server back-end, all powered by TypeScript. The goal of this project is to demonstrate advanced front-end and back-end integration, scalability, and real-time capabilities.

## Features
- **Client**:
  - Built with Next.js 15 and React 18.
  - Responsive UI using TailwindCSS and Radix UI.
  - Dynamic data fetching with Apollo Client.
  - OAuth integration via Firebase for authentication.

- **Server**:
  - GraphQL API built with Apollo Server v4.
  - Real-time capabilities using WebSockets for OpenAI response streaming.
  - Scalable and modular architecture.
  - Environment variable management with `dotenv`.

## Tech Stack
### Client
- [Next.js](https://nextjs.org/) 15
- [React](https://reactjs.org/) 18
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Apollo Client](https://www.apollographql.com/docs/react/)

### Server
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) v4
- [GraphQL](https://graphql.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)

### Authentication
- [Firebase Authentication](https://firebase.google.com/docs/auth) for OAuth support (Google, GitHub, and Anonymous).

## Installation

### Prerequisites
- Node.js (LTS version recommended)
- npm or pnpm
- Git

### Clone the Repository
```bash
git clone <repository-url>
cd project-404
```

### Install Dependencies
#### Client
```bash
cd client
npm install
```

#### Server
```bash
cd server
npm install
```

### Environment Variables
Create a `.env` file in the `server` folder and populate it with the following:
```
PORT=4000
OPENAI_API_KEY=<Your OpenAI API Key>
FIREBASE_API_KEY=<Your Firebase API Key>
FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>
FIREBASE_PROJECT_ID=<Your Firebase Project ID>
```

### Run the Application
#### Client
```bash
cd client
npm run dev
```

#### Server
```bash
cd server
npm run dev
```

The client will run on `http://localhost:3000` and the server on `http://localhost:4000` by default.

## Usage
1. Open the client at `http://localhost:3000`.
2. Authenticate using Google, GitHub, or Anonymous login.
3. Start a conversation with the AI chatbot.
4. View real-time responses powered by OpenAI.

## Future Enhancements
- Integrate Notion API for advanced user data storage and management.
- Add a settings dashboard for user preferences.
- Implement streaming for OpenAI responses via WebSockets.
- Extend OAuth to additional providers (e.g., Facebook).

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments
- [OpenAI](https://openai.com/) for API integration.
- [Radix UI](https://www.radix-ui.com/) for accessible components.
- [TailwindCSS](https://tailwindcss.com/) for rapid UI development.

---

Happy coding!

