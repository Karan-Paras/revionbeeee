import authConfig from "@/auth.config";
import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  paths,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  const pathSegment = `/${nextUrl.pathname.split("/")[1]}`;

  const isPublicRoute = publicRoutes.includes(pathSegment);
  const isAuthRoute = authRoutes.includes(pathSegment);

  if (isApiAuthRoute) {
    return;
  }

  const isTeacherOnboardingRoute = [
    paths.teacherPersonalInfo(),
    paths.teacherEducation(),
    paths.teacherAddQualification(),
    paths.teacherCertifications(),
    paths.teacherAddCertification(),
    paths.teacherAvailability(),
    paths.teacherBankDetails(),
    paths.teacherAddBank(),
    paths.teacherProfileCreated(),
  ].includes(nextUrl.pathname);

  const isTeacherAtSignupStep =
    nextUrl.pathname === paths.teacherSignup() &&
    isLoggedIn &&
    req.auth?.user?.userType === "teacher" &&
    Number(req.auth.user.teacherProfileStatus) === 1;

  if (isTeacherAtSignupStep) {
    return;
  }

  if (isTeacherOnboardingRoute) {
    if (!isLoggedIn) {
      return Response.redirect(new URL(paths.login(), nextUrl));
    }
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(paths.login(), nextUrl));
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
