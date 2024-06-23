import { commentProps } from "@/interfaces/courseComment.interface";
import {
  getCoursesTopApi,
  getCourseDetailsApi,
  getCoursesWithPaginationApi,
  getAllCourseLevelApi,
  getCourseTypesApi,
  getTechnologiesApi,
  getCoursesCommentApi,
  sendCommentApi,
  addReplyCourseCommentApi,
  addCourseCommentLikeApi,
  addCourseCommentDissLikeApi,
  addCourseReserveApi,
  addCourseFavoriteApi,
  deleteCourseFavoriteApi,
  addCourseLikeApi,
  addCourseDissLikeApi,
  getSubCourseCommentApi,
  addCourseStarsApi,
  getSubNewsCommentApi,
} from "@/services/api/coursesApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

export const useGetCoursesTopApi = (Count: number) => {
  return useQuery({
    queryKey: ["coursesTop"],
    queryFn: () => getCoursesTopApi(Count).then((data) => data.data),
  });
};

export const useGetCourseDetailsApi = (
  CourseId: string | string[] | undefined
) => {
  return useQuery({
    queryKey: ["courseDetails", CourseId],
    queryFn: () => getCourseDetailsApi(CourseId).then((data) => data.data),
    enabled: !!CourseId,
  });
};

export const useGetCoursesWithPaginationApi = (params: any) => {
  return useQuery({
    queryKey: ["coursesWithPagination", params],
    queryFn: () =>
      getCoursesWithPaginationApi(params).then((data) => data.data),
  });
};

export const useGetAllCourseLevelApi = () => {
  return useQuery({
    queryKey: ["courseLevel"],
    queryFn: () => getAllCourseLevelApi().then((data) => data.data),
  });
};

export const useGetCourseTypesApi = () => {
  return useQuery({
    queryKey: ["courseType"],
    queryFn: () => getCourseTypesApi().then((data) => data.data),
  });
};

export const useGetTechnologiesApi = () => {
  return useQuery({
    queryKey: ["technologies"],
    queryFn: () => getTechnologiesApi().then((data) => data.data),
  });
};

export const useGetCoursesCommentApi = (
  CourseId: string | string[] | undefined
) => {
  return useQuery({
    queryKey: ["coursesComments", CourseId],
    queryFn: () => getCoursesCommentApi(CourseId).then((data) => data.data),
    enabled: !!CourseId,
  });
};

export const useAddCommentApi = (reset: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: commentProps) => sendCommentApi(payload),
    onSuccess: () => {
      toast.success("کامنت با موفقیت ثبت شد");
      reset();
      queryClient.invalidateQueries({ queryKey: ["coursesComments"] });
    },
  });
};

export const useAddReplyCourseCommentApi = (reset: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (parmas: commentProps) => addReplyCourseCommentApi(parmas),
    onSuccess: () => {
      toast.success("پاسخ شما ثبت شد");
      reset();
      queryClient.invalidateQueries({
        queryKey: ["coursesComments"],
      });
    },
  });
};

export const useAddCourseCommentLikeApi = (courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (CourseCommandId: string) =>
      addCourseCommentLikeApi(CourseCommandId),
    onSuccess: () => {
      toast.success("کامنتی که لایک کردی با موفقیت انجام شد");
      queryClient.invalidateQueries({
        queryKey: ["coursesComments", courseId],
      });
    },
  });
};

export const useAddCourseCommentDissLikeApi = (courseId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (CourseCommandId: string) =>
      addCourseCommentDissLikeApi(CourseCommandId),
    onSuccess: () => {
      toast.success("کامنتی که دیسلایک کردی با موفقیت انجام شد");
      queryClient.invalidateQueries({
        queryKey: ["coursesComments", "coursesTop", courseId],
      });
    },
  });
};

export const useAddCourseLikeApi = (
  setIsLiked: Dispatch<SetStateAction<boolean | undefined>>
) => {
  return useMutation({
    mutationFn: (CourseId: string) => addCourseLikeApi(CourseId),
    onSuccess: () => {
      toast.success("دوره که لایک کردی با موفقیت انجام شد");
      setIsLiked(true);
    },
  });
};

export const useAddCourseDissLikeApi = (
  setIsLiked: Dispatch<SetStateAction<boolean | undefined>>
) => {
  return useMutation({
    mutationFn: (CourseId: string) => addCourseDissLikeApi(CourseId),
    onSuccess: () => {
      toast.success("دوره که دیسلایک کردی با موفقیت انجام شد");
      setIsLiked(false);
    },
  });
};

export const useAddCourseReserveApi = () => {
  return useMutation({
    mutationFn: (payload: { courseId: string | string[] | undefined }) =>
      addCourseReserveApi(payload),
    onSuccess: () => {
      toast.success("دوره موردنظر با موفقیت رزرو شد");
    },
  });
};

export const useAddCourseFavoriteApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { courseId: string | string[] | undefined }) =>
      addCourseFavoriteApi(payload),
    onSuccess: () => {
      toast.success("این دوره به مورد علاقه های شما اضافه شد");
      queryClient.invalidateQueries({
        queryKey: ["coursesWithPagination"],
      });
      queryClient.invalidateQueries({
        queryKey: ["courseDetails"],
      });
      queryClient.invalidateQueries({
        queryKey: ["coursesTop"],
      });
    },
  });
};

export const useDeleteCourseFavoriteApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { CourseFavoriteId: string | undefined }) =>
      deleteCourseFavoriteApi(payload),
    onSuccess: () => {
      toast.success("این دوره از مورد علاقه های شما حذف شد");
      queryClient.invalidateQueries({
        queryKey: ["coursesWithPagination"],
      });
      queryClient.invalidateQueries({
        queryKey: ["courseDetails"],
      });
      queryClient.invalidateQueries({
        queryKey: ["coursesTop"],
      });
    },
  });
};

export const useGetCourseSubCommentApi = (
  CommentId: string | string[] | undefined,
  CourseId: string | string[] | undefined
) => {
  return useQuery({
    queryKey: ["CourseSubComments", CommentId, CourseId],
    queryFn: () =>
      getSubCourseCommentApi(CommentId, CourseId).then((data) => data.data),
    enabled: !!CommentId,
  });
};

export const useGetNewsSubCommentApi = (
  CommentId: string | string[] | undefined
) => {
  return useQuery({
    queryKey: ["CourseSubComments", CommentId],
    queryFn: () => getSubNewsCommentApi(CommentId).then((data) => data.data),
    enabled: !!CommentId,
  });
};

export const useAddStarsApi = (CourseId: string | string[] | undefined) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paload: any) => addCourseStarsApi(paload),
    onSuccess: () => {
      toast.success("ثبت امتیاز موفقیت آمیز بود");
      queryClient.invalidateQueries({
        queryKey: ["courseDetails", CourseId],
      });
    },
  });
};
