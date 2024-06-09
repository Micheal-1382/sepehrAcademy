import {
  getNewsCommentApi,
  getNewsWithPaginationApi,
  newsCommentLikeApi,
} from "@/services/api/newsApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNewsDetailsApi } from "@/services/api/newsApi";
import toast from "react-hot-toast";

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
