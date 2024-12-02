import { gql } from "graphql-tag";

export const typeDefs = gql`
  type FirebaseUID {
    uid: String!
    createdAt: String
    updatedAt: String
    archived: Boolean
    archivedAt: String
    mergedAt: String
  }

  type Preferences {
    id: ID!
    userId: ID
    defaultTemperature: Float
    theme: String
    notifications: Boolean
    language: String
    responseFormat: String
    autoSave: Boolean
    dataRetention: String
    defaultPrompt: String
    tokenUsageDisplay: Boolean
    maxTokens: Int
    exportToNotion: Boolean
  }

  type User {
    id: ID!
    firebaseUIDs: [FirebaseUID!]!
    lastKnownIP: String
    googleUID: String
    email: String
    displayName: String
    photoURL: String
    createdAt: String
    updatedAt: String
    archived: Boolean
    archivedAt: String
  }

  type Message {
    role: String!
    content: String!
    createdAt: String
  }

  type Conversation {
    id: ID!
    userId: ID!
    conversationTitle: String
    messages: [Message!]!
    tags: [String!]
    status: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    # User queries
    getUser(userId: ID!): User
    # Preferences queries
    getPreferences(userId: ID!): Preferences
    # Conversation queries
    getConversations(userId: ID!): [Conversation!]
    getConversation(userId: ID!, conversationId: ID!): Conversation
  }

  type Mutation {
    # User mutations
    createUser(firebaseUID: String, googleUID: String, email: String): User
    updateUser(userId: ID!, input: UserInput!): User
    deleteUser(userId: ID!): Message
    mergeUserUIDs(primaryUID: String!, googleUID: String, email: String): User

    # Preferences mutations
    updatePreferences(userId: ID!, input: PreferencesInput!): Preferences

    # Conversation mutations
    createConversation(userId: ID!, conversationTitle: String, messages: [MessageInput!]): Conversation
    updateConversation(conversationId: ID!, input: ConversationInput!): Conversation
    deleteConversation(conversationId: ID!): Message
  }

  # Helper types
  input UserInput {
    email: String
    displayName: String
    photoURL: String
  }

  input PreferencesInput {
    theme: String
    notifications: Boolean
    language: String
  }

  input MessageInput {
    role: String!
    content: String!
  }

  input ConversationInput {
    conversationTitle: String
    messages: [MessageInput!]
  }

  type Message {
    message: String!
  }
`;
