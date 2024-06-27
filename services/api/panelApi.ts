import httpService from "@/services/httpService";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const getProfileInfoApi = (token?: string | undefined) => {
  return httpService.get(baseUrl + `SharePanel/GetProfileInfo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMyCourseListApi = (params: any) => {
  return httpService.get(baseUrl + `SharePanel/GetMyCourses`, { params });
};

export const addProfileImageApi = (payload: { formFile: File }) => {
  return httpService.post(baseUrl + `SharePanel/AddProfileImage`, payload, {
    headers: {
      useMultipartForm: true,
    },
  });
};

export const deleteProfileImageApi = (DeleteEntityId: string) => {
  return httpService.delete(baseUrl + `SharePanel/DeleteProfileImage`, {
    data: {
      DeleteEntityId,
    },
    headers: {
      useMultipartForm: true,
    },
  });
};

export const changePasswordApi = (payload: {
  oldPassword: string;
  newPassword: string;
}) => {
  return httpService.post(baseUrl + `SharePanel/ChangePassword`, payload);
};

export const updateProfileInfoApi = (payload: any) => {
  return httpService.put(baseUrl + `SharePanel/UpdateProfileInfo`, payload, {
    headers: {
      useMultipartForm: true,
    },
  });
};

export const getMyFavoriteCoursesApi = () => {
  return httpService.get(baseUrl + `SharePanel/GetMyFavoriteCourses`);
};

export const getMyFavoriteNewsApi = () => {
  return httpService.get(baseUrl + `SharePanel/GetMyFavoriteNews`);
};
