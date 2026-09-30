import { User } from "next-auth";

export const isUserProfileComplete = (user: User): boolean => {
  return Boolean(user.name?.trim() && user.image?.trim());
};
