import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firebaseUIDs: {
    uid: string;
    createdAt: Date;
    updatedAt: Date;
    archived: boolean;
    archivedAt: Date | null;
    mergedAt: Date;
  }[];
  lastKnownIP?: string;
  googleUID?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
  archivedAt: Date | null;
  mergedAt?: Date;
  preferences?: mongoose.Types.ObjectId;
  conversations: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  firebaseUIDs: [
    {
      uid: { type: String, required: true, index: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
      archived: { type: Boolean, default: false },
      archivedAt: { type: Date, default: null },
      mergedAt: { type: Date },
    },
  ],
  lastKnownIP: { type: String, sparse: true },
  googleUID: { type: String, index: true, sparse: true },
  email: { type: String, index: true, sparse: true },
  displayName: { type: String, sparse: true },
  photoURL: { type: String, sparse: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  archived: { type: Boolean, default: false },
  archivedAt: { type: Date, default: null },
  mergedAt: { type: Date },
  preferences: { type: Schema.Types.ObjectId, ref: "Preferences" },
  conversations: [{ type: Schema.Types.ObjectId, ref: "Conversation" }], // Add this
});

export const User = mongoose.model<IUser>("User", userSchema);
