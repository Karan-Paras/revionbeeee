import { fetchServer } from "@/lib/fetch-server";

export type TeacherProfileDetail = {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  professionalTitle?: string;
  bio?: string;
  mobileNumber?: string;
  country?: string;
  city?: string;
  hourlyRate?: number | string;
  profileImage?: string;
  profilePicture?: string;
  qualifications?: Array<{
    id?: number | string;
    institutionName?: string;
    institution?: string;
    degree?: string;
    fieldOfStudy?: string;
    graduationYear?: string | number;
  }>;
  certifications?: Array<{
    id?: number | string;
    certificationName?: string;
    name?: string;
    issuingAuthority?: string;
    authority?: string;
    issueDate?: string;
    certificationFile?: string;
    image?: string;
  }>;
};

export type TeacherProfileDetailResponse = TeacherProfileDetail & {
  user?: TeacherProfileDetail;
  teacher?: TeacherProfileDetail;
  profile?: TeacherProfileDetail;
  teacherProfile?: TeacherProfileDetail;
  data?: TeacherProfileDetail;
};

export async function getTeacherProfileDetail() {
  const apiBaseUrl = process.env.NEXT_TEACHER_API_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_TEACHER_API_URL is not configured.");
  }

  const apiUrl = `${apiBaseUrl.replace(/\/+$/, "")}/teacher/profile/detail`;
  return fetchServer<TeacherProfileDetailResponse>(apiUrl, "GET");
}
