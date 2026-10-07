import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  paths,
  publicRoutes,
} from "@/routes";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
//hello
export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });
  const isLoggedIn = !!token;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  const pathSegment = `/${nextUrl.pathname.split("/")[1]}`;

  const isPublicRoute = publicRoutes.includes(pathSegment);
  const isAuthRoute = authRoutes.includes(pathSegment);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  const isTeacherOnboardingRoute = [
    paths.teacherPersonalInfo(),
    paths.teacherEducation(),
    paths.teacherAddQualification(),
    paths.teacherCertifications(),
    paths.teacherAddCertification(),
    paths.teacherAvailability(),
    paths.teacherBankDetails(),
    paths.teacherProfileCreated(),
  ].includes(nextUrl.pathname);

  const isTeacherAtSignupStep =
    nextUrl.pathname === paths.teacherSignup() &&
    isLoggedIn &&
    token?.userType === "teacher" &&
    Number(token.teacherProfileStatus) === 1;

  if (isTeacherAtSignupStep) {
    return NextResponse.next();
  }

  if (isTeacherOnboardingRoute) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(paths.login(), nextUrl));
    }
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL(paths.login(), nextUrl));
  }

  return NextResponse.next();
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
