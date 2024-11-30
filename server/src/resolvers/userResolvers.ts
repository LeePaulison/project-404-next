import { User } from "../models/User";
import { Preferences } from "../models/Preferences";
import { ObjectId } from "mongodb";

export const userResolvers = {
  Query: {
    getUser: async (_: any, { userId }: { userId: string }) => {
      return await User.findById(userId).populate("preferences").populate("conversations").populate("conversations");
    },
  },
  Mutation: {
    createUser: async (_: any, { firebaseUID, googleUID, email }: any) => {
      const newUser = new User({
        firebaseUIDs: [{ uid: firebaseUID }],
        googleUID,
        email,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await newUser.save();
      return newUser;
    },
    updateUser: async (_: any, { userId, input }: any) => {
      return await User.findByIdAndUpdate(userId, input, { new: true });
    },
    deleteUser: async (_: any, { userId }: any) => {
      await User.findByIdAndDelete(userId);
      return { message: "User deleted successfully" };
    },
    mergeUserUIDs: async (_: any, { primaryUID, googleUID, email }: any, { ip }: any) => {
      try {
        const userIP = ip; // Access IP from context
        const currentTime = Date.now();
        const normalizedEmail = email ? email.toLowerCase() : "";

        // Step 1: Find users by googleUID and primaryUID
        const [googleUser, anonymousUser] = await Promise.all([
          User.findOne({ googleUID }),
          User.findOne({ $or: [{ "firebaseUIDs.uid": primaryUID }, { lastKnownIP: userIP }] }),
        ]);

        // console.log("Merging UIDs - googleUser:", googleUser, "anonymousUser:", anonymousUser);

        if (googleUser) {
          // If there's an anonymous user, delete it after merging
          if (anonymousUser) {
            // Merge anonymous preferences into googleUser if googleUser has no preferences
            const googleUserPreferences = await Preferences.findOne({ userId: googleUser._id });
            const anonymousUserPreferences = await Preferences.findOne({ userId: anonymousUser._id });

            if (!googleUserPreferences && anonymousUserPreferences) {
              anonymousUserPreferences.userId = googleUser._id as unknown as ObjectId;
              await anonymousUserPreferences.save();
            } else if (anonymousUserPreferences) {
              await anonymousUserPreferences.deleteOne();
            }

            await anonymousUser.deleteOne();
          }

          // Check if primaryUID already exists in googleUser's firebaseUIDs
          const existingUID = googleUser.firebaseUIDs.find((uid) => uid.uid === primaryUID);

          if (!existingUID) {
            // Add new primaryUID entry if not already present
            googleUser.firebaseUIDs.push({
              uid: primaryUID,
              createdAt: new Date(),
              updatedAt: new Date(),
              archived: true,
              archivedAt: new Date(),
              mergedAt: new Date(),
            });
          } else if (!existingUID.archived) {
            // Archive existing primaryUID if not already archived
            existingUID.archived = true;
            existingUID.archivedAt = new Date(currentTime);
          }

          // Update timestamps
          googleUser.updatedAt = new Date(currentTime);
          googleUser.mergedAt = new Date(currentTime);

          await googleUser.save();
          return googleUser;
        }

        // Case 2: No googleUID found, handle anonymous user with primaryUID
        if (anonymousUser) {
          // Archive all existing firebaseUIDs
          anonymousUser.firebaseUIDs = anonymousUser.firebaseUIDs.map((uid) => ({
            ...uid,
            archived: true,
            archivedAt: new Date(currentTime),
          }));

          // Add Google-specific details to the anonymous user
          Object.assign(anonymousUser, {
            googleUID,
            email: normalizedEmail,
            updatedAt: currentTime,
            mergedAt: currentTime,
          });

          await anonymousUser.save();
          return anonymousUser;
        }

        // If neither user was found
        throw new Error("User not found for merging.");
      } catch (error) {
        if (error instanceof Error && error.message === "User not found for merging.") {
          throw error; // Re-throw specific error
        }

        console.error("Error merging UIDs:", error);
        throw new Error("Internal server error");
      }
    },
  },
};
