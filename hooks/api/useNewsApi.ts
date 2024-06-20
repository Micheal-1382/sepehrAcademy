import {
  addNewsFavoriteApi,
  deleteNewsFavoriteApi,
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

export const useAddNewsFavoriteApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ NewsId }: { NewsId: string | string[] | undefined }) => {
      if (typeof NewsId === 'string') {
        return addNewsFavoriteApi(NewsId);
      } else {
        // Handle the case where NewsId is not a string
        throw new Error('Invalid NewsId');
      }
    },
    onSuccess: () => {
      toast.success("این خبر به مورد علاقه های شما اضافه شد");
      queryClient.invalidateQueries({
        queryKey: ["newsWithPagination"],
      });
      queryClient.invalidateQueries({
        queryKey: ["newsDetails"],
      });
    },
  });
};

export const useDeleteNewsFavoriteApi = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ deleteEntityId }: { deleteEntityId: string | undefined }) => {
      if (typeof deleteEntityId === 'string') {
        return deleteNewsFavoriteApi(deleteEntityId);
      } else {
        // Handle the case where deleteEntityId is not a string
        throw new Error('Invalid deleteEntityId');
      }
    },
    onSuccess: () => {
      toast.success("این خبر از مورد علاقه های شما حذف شد");
      queryClient.invalidateQueries({
        queryKey: ["newsWithPagination"],
      });
      queryClient.invalidateQueries({
        queryKey: ["newsDetails"],
      });
    },
  });
};


