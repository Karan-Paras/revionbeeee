import { fetchServer } from "@/lib/fetch-server";

export type TeacherProfileDetail = {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  professionalTitle?: string;
  bio?: string;
  mobileNumber?: string;
  countryCode?: string;
  country?: string;
  city?: string;
  hourlyRate?: number | string;
  profileImage?: string;
  profilePicture?: string;
  isOnline?: boolean | number;
  is_online?: boolean | number;
  onlineStatus?: boolean | number;
  online_status?: boolean | number;
  availabilities?: Array<{
    id?: number | string;
    dayOfWeek?: number;
    day_of_week?: number;
    startTime?: string;
    start_time?: string;
    endTime?: string;
    end_time?: string;
    isAvailable?: boolean | number;
    is_available?: boolean | number;
  }>;
  qualifications?: Array<{
    id?: number | string;
    institutionName?: string;
    institution_name?: string;
    institution?: string;
    degree?: string;
    fieldOfStudy?: string;
    field_of_study?: string;
    graduationYear?: string | number;
    graduation_year?: string | number;
  }>;
  certifications?: Array<{
    id?: number | string;
    certificationName?: string;
    certification_name?: string;
    name?: string;
    issuingAuthority?: string;
    issuing_authority?: string;
    authority?: string;
    issueDate?: string;
    issue_date?: string;
    certificationFile?: string;
    certification_file?: string;
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

export async function getTeacherProfileDetail(token?: string) {
  const apiBaseUrl = process.env.NEXT_TEACHER_API_URL;

  if (!apiBaseUrl) {
    throw new Error("NEXT_TEACHER_API_URL is not configured.");
  }

  const apiUrl = `${apiBaseUrl.replace(/\/+$/, "")}/teacher/profile/detail`;
  return fetchServer<TeacherProfileDetailResponse>(
    apiUrl,
    "GET",
    undefined,
    { revalidate: 0 },
    token ? { Authorization: `Bearer ${token}` } : undefined
  );
}
