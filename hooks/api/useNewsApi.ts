import {
  addNewsDissLikeApi,
  addNewsLikeApi,
  getLatestNewsApi,
  getNewsCommentApi,
  getNewsWithPaginationApi,
  newsCommentLikeApi,
  sendBlogCommentApi,
} from "@/services/api/newsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNewsDetailsApi } from "@/services/api/newsApi";
import toast from "react-hot-toast";
import { blogProps } from "@/interfaces/blogComment.interface";
import { Dispatch, SetStateAction } from "react";

export const useGetLatestNewsApi = (Count: number) => {
  return useQuery({
    queryKey: ["latestNews"],
    queryFn: () => getLatestNewsApi(Count).then((data) => data.data),
  });
};

export const useGetNewsWithPaginationApi = (params: any) => {
  return useQuery({
    queryKey: ["newsWithPagination", params],
    queryFn: () => getNewsWithPaginationApi(params).then((data) => data.data),
  });
};

export const useGetNewsDetailsApi = (NewsId: string | string[] | undefined) => {
  return useQuery({
    queryKey: ["newsDetails"],
    queryFn: () => getNewsDetailsApi(NewsId).then((data) => data.data),
    enabled: !!NewsId,
  });
};

export const useGetNewsCommentApi = (NewsId: string | string[] | undefined) => {
  return useQuery({
    queryKey: ["newsComments", NewsId],
    queryFn: () => getNewsCommentApi(NewsId).then((data) => data.data),
    enabled: !!NewsId,
  });
};

export const useNewsCommentLikeApi = (NewsId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      CommentId,
      LikeType,
    }: {
      CommentId: string;
      LikeType: boolean;
    }) => newsCommentLikeApi(CommentId, LikeType),
    onSuccess: () => {
      toast.success("فیدبک شما با موفقیت ثبت شد");
      queryClient.invalidateQueries({
        queryKey: ["newsComments", NewsId],
      });
    },
  });
};

export const useAddBlogCommentApi = (reset: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: blogProps) => sendBlogCommentApi(payload),
    onSuccess: () => {
      toast.success("کامنت با موفقیت ثبت شد");
      reset();
      queryClient.invalidateQueries({ queryKey: ["blogsComments"] });
    },
  });
};

export const useAddNewsLikeApi = (
  setIsLiked: Dispatch<SetStateAction<boolean | undefined>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (CourseId: string) => addNewsLikeApi(CourseId),
    onSuccess: () => {
      toast.success("خبری که لایک کردی با موفقیت انجام شد");
      setIsLiked(true);
      queryClient.invalidateQueries({
        queryKey: ["CoursesLike"],
      });
    },
  });
};

export const useAddNewsDissLikeApi = (
  setIsLiked: Dispatch<SetStateAction<boolean | undefined>>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (CourseId: string) => addNewsDissLikeApi(CourseId),
    onSuccess: () => {
      toast.success("خبری که دیسلایک کردی با موفقیت انجام شد");
      setIsLiked(false);
      queryClient.invalidateQueries({
        queryKey: ["CoursesLike"],
      });
    },
  });
};
