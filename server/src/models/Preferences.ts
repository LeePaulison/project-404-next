import mongoose, { Schema, Document } from "mongoose";

export interface IPreferences extends Document {
  userId: mongoose.Types.ObjectId;
  defaultTemperature: number;
  theme: string;
  notifications: boolean;
  language: string;
  responseFormat: string;
  autoSave: boolean;
  dataRetention: string;
  defaultPrompt: string;
  tokenUsageDisplay: boolean;
  maxTokens: number;
  exportToNotion: boolean;
}

const preferencesSchema = new Schema<IPreferences>({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  defaultTemperature: { type: Number, default: 0.7 },
  theme: { type: String, default: "light" },
  notifications: { type: Boolean, default: true },
  language: { type: String, default: "en" },
  responseFormat: { type: String, default: "Concise" },
  autoSave: { type: Boolean, default: true },
  dataRetention: { type: String, default: "14 days" },
  defaultPrompt: { type: String, default: "" },
  tokenUsageDisplay: { type: Boolean, default: false },
  maxTokens: { type: Number, default: 1000 },
  exportToNotion: { type: Boolean, default: false },
});

export const Preferences = mongoose.model<IPreferences>("Preferences", preferencesSchema);
