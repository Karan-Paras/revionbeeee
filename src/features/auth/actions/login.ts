"use server";

import { signIn } from "@/auth";
import { login as loginApi } from "@/features/auth/api/login";
import { LoginSchema } from "@/features/auth/schemas";
type LoginFormState = {
  errors: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  success?: boolean;
  userType?: "student" | "teacher";
  profileStatus?: number;
  teacherProfileStatus?: number;
};

export const login = async (
  _formState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> => {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  let json;
  const deviceToken = String(formData.get("deviceToken") ?? "").trim();

  try {
    json = await loginApi(validatedFields.data, deviceToken);
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to sign in. Please try again.";

    return { errors: { _form: [message] } };
  }

  if (!json?.data || !json.token) {
    return {
      errors: {
        _form: ["The login API returned an invalid response."],
      },
    };
  }

  try {
    await signIn("credentials", {
      user: JSON.stringify(json.data),
      token: json.token,
      redirect: false,
    });
  } catch (error: unknown) {
    console.error(error);
    return { errors: { _form: ["Something went wrong!"] } };
  }

  return {
    errors: {},
    success: true,
    userType: json.data.userType,
    profileStatus: json.data.profileStatus ?? json.data.profile_status,
    teacherProfileStatus:
      json.data.teacherProfileStatus ?? json.data.teacher_profile_status,
  };
};
