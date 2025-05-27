import { User } from "next-auth";

export const isUserProfileComplete = (user: User): boolean => {
  return !!user.name && !!user.image;
};
