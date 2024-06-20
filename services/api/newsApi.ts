import { blogProps } from "@/interfaces/blogComment.interface";
import httpService from "@/services/httpService";
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const getLatestNewsApi = (Count: number) => {
  return httpService.get(baseUrl + `News?PageNumber=1&RowsOfPage=${Count}`);
};

export const getNewsWithPaginationApi = (params: any) => {
  return httpService.get(baseUrl + `News`, { params });
};

export const getNewsDetailsApi = (NewsId: string | string[] | undefined) => {
  return httpService.get(baseUrl + `News/${NewsId}`);
};

export const getNewsCommentApi = (newsId: string | string[] | undefined) => {
  return httpService.get(baseUrl + `News/GetNewsComments?NewsId=${newsId}`);
};

export const newsCommentLikeApi = (
  CommentId: string,
  LikeType: boolean
) => {
  return httpService.post(
    baseUrl + `News/CommentLike/${CommentId}?LikeType=${LikeType}`
  );
};

export const sendBlogCommentApi = (payload: blogProps) => {
  return httpService.post(baseUrl + `News/CreateNewsComment`, payload, {
    headers: {
      useMultipartForm: true,
    },
  });
};

export const addNewsFavoriteApi = (NewsId: string) => {
  return httpService.post(
    baseUrl + `News/AddFavoriteNews?NewsId=${NewsId}`
  );
};

export const deleteNewsFavoriteApi = (DeleteEntityId : string) => {
  return httpService.delete(
    baseUrl +
      `News/DeleteFavoriteNews`,
      {data: {deleteEntityId : DeleteEntityId}}
  );
};
