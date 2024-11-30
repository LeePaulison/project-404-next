import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
}

export interface IConversation extends Document {
  userId: mongoose.Types.ObjectId;
  conversationTitle: string;
  messages: IMessage[];
  tags: string[];
  status: 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
  role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const conversationSchema = new Schema<IConversation>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  conversationTitle: { type: String, default: 'Untitled Conversation' },
  messages: [messageSchema],
  tags: { type: [String], default: [] },
  status: { type: String, enum: ['active', 'archived'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Conversation = mongoose.model<IConversation>('Conversation', conversationSchema);
