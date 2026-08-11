import { paths } from "@/routes";

export function getPostLoginPath(
  userType: unknown,
  teacherProfileStatus?: unknown
) {
  const normalizedUserType = String(userType ?? "").toLowerCase();

  if (normalizedUserType === "teacher") {
    switch (Number(teacherProfileStatus)) {
      case 1:
        return paths.teacherSignup();
      case 2:
        return paths.teacherPersonalInfo();
      case 3:
        return paths.teacherEducation();
      case 4:
        return paths.teacherCertifications();
      case 5:
        return paths.teacherAvailability();
      case 6:
        return paths.teacherBankDetails();
      case 7:
      default:
        return paths.teacherDashboard();
    }
  }

  if (normalizedUserType === "student") {
    return paths.dashboard();
  }

  return paths.login();
}
