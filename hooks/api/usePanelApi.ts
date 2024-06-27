import {
  addProfileImageApi,
  changePasswordApi,
  deleteProfileImageApi,
  getMyCourseListApi,
  getProfileInfoApi,
  updateProfileInfoApi,
  getMyFavoriteCoursesApi,
  getMyFavoriteNewsApi,
} from "@/services/api/panelApi";
import { isUserAuthenticated } from "@/utils/isUserAuthenticated";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetProfileInfoApi = () => {
  return useQuery({
    queryKey: ["profileInfo"],
    queryFn: () => getProfileInfoApi().then((data) => data.data),
    retry: 0,
    enabled: !!isUserAuthenticated(),
  });
};

export const useGetMyCoursesWithPaginationApi = (params: any) => {
  return useQuery({
    queryKey: ["myCoursesWithPagination", params],
    queryFn: () => getMyCourseListApi(params).then((data) => data.data),
  });
};

export const useAddProfileImageApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { formFile: File }) => addProfileImageApi(payload),
    onSuccess: () => {
      toast.success("عکس پروفایل شما با موفقیت بروزرسانی شد");
    },
  });
};

export const useDeleteProfileImageApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (DeleteEntityId: string) => {
      console.log(DeleteEntityId);

      return deleteProfileImageApi(DeleteEntityId);
    },
    onSuccess: () => {
      toast.success("عکس پروفایل شما با موفقیت حذف شد");
      queryClient.invalidateQueries({
        queryKey: ["profileInfo"],
      });
    },
  });
};

export const useChangePasswordApi = (reset: () => void) => {
  return useMutation({
    mutationFn: (payload: { oldPassword: string; newPassword: string }) =>
      changePasswordApi(payload),
    onSuccess: () => {
      toast.success("رمز عبور شما با موفقیت تغییر کرد");
      reset();
    },
  });
};

export const useUpdateProfileInfoApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => updateProfileInfoApi(payload),
    onSuccess: () => {
      toast.success("مشخصات موردنظر با موفقیت ویرایش یافت");
      queryClient.invalidateQueries({
        queryKey: ["profileInfo"],
      });
    },
  });
};

export const useGetMyFavoriteCoursesApi = () => {
  return useQuery({
    queryKey: ["MyFavoriteCourses"],
    queryFn: () => getMyFavoriteCoursesApi().then((data) => data.data),
  });
};

export const useGetMyFavoriteNewsApi = () => {
  return useQuery({
    queryKey: ["MyFavoriteNews"],
    queryFn: () => getMyFavoriteNewsApi().then((data) => data.data),
  });
};
