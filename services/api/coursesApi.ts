import { commentProps } from "@/interfaces/courseComment.interface";
import httpService from "@/services/httpService";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const getCoursesTopApi = (Count: number) => {
  return httpService.get(baseUrl + `Home/GetCoursesTop?Count=${Count}`);
};

export const getCourseDetailsApi = (
  CourseId: string | string[] | undefined
) => {
  return httpService.get(
    baseUrl + `Home/GetCourseDetails?CourseId=${CourseId}`
  );
};

export const getCoursesWithPaginationApi = (params: any) => {
  return httpService.get(baseUrl + `Home/GetCoursesWithPagination`, { params });
};

export const getAllCourseLevelApi = () => {
  return httpService.get(baseUrl + "CourseLevel/GetAllCourseLevel");
};

export const getCourseTypesApi = () => {
  return httpService.get(baseUrl + "CourseType/GetCourseTypes");
};

export const getTechnologiesApi = () => {
  return httpService.get(baseUrl + "Home/GetTechnologies");
};

export const getCoursesCommentApi = (
  CourseId: string | string[] | undefined
) => {
  return httpService.get(baseUrl + `Course/GetCourseCommnets/${CourseId}`);
};

export const sendCommentApi = (payload: commentProps) => {
  return httpService.post(baseUrl + `Course/AddCommentCourse`, payload, {
    headers: {
      useMultipartForm: true,
    },
  });
};

export const addReplyCourseCommentApi = (payload: commentProps) => {
  return httpService.post(baseUrl + `Course/AddReplyCourseComment`, payload, {
    headers: {
      useMultipartForm: true,
    },
  });
};

export const addCourseCommentLikeApi = (CourseCommandId: string) => {
  return httpService.post(
    baseUrl + `Course/AddCourseCommentLike?CourseCommandId=${CourseCommandId}`
  );
};

export const addCourseCommentDissLikeApi = (CourseCommandId: string) => {
  return httpService.post(
    baseUrl +
      `Course/AddCourseCommentDissLike?CourseCommandId=${CourseCommandId}`
  );
};

export const addCourseLikeApi = (CourseId: string) => {
  return httpService.post(
    baseUrl + `Course/AddCourseLike?CourseId=${CourseId}`
  );
};

export const addCourseDissLikeApi = (CourseId: string) => {
  return httpService.post(
    baseUrl + `Course/AddCourseDissLike?CourseId=${CourseId}`
  );
};

export const addCourseReserveApi = (payload: {
  courseId: string | string[] | undefined;
}) => {
  return httpService.post(baseUrl + `CourseReserve/ReserveAdd`, payload);
};

export const addCourseFavoriteApi = (payload: {
  courseId: string | string[] | undefined;
}) => {
  return httpService.post(baseUrl + `Course/AddCourseFavorite`, payload);
};

export const deleteCourseFavoriteApi = (payload: {
  CourseFavoriteId: string | undefined;
}) => {
  return httpService.delete(baseUrl + "Course/DeleteCourseFavorite", {
    headers: {
      useMultipartForm: true,
    },
    data: {
      CourseFavoriteId: payload.CourseFavoriteId,
    },
  });
};

export const getSubCourseCommentApi = (
  CommentId: string | string[] | undefined,
  CourseId: string | string[] | undefined
) => {
  return httpService.get(
    baseUrl + `Course/GetCourseReplyCommnets/${CourseId}/${CommentId}`
  );
};

export const getSubNewsCommentApi = (
  CommentId: string | string[] | undefined
) => {
  return httpService.get(baseUrl + `News/GetRepliesComments?Id=${CommentId}`);
};

export const addCourseStarsApi = (payload: {
  courseId: string | string[] | undefined;
  rate: number | number[] | undefined;
}) => {
  console.log(`Course/AddCourseFavoriteCourse/SetCourseRating?CourseId=${payload.courseId}&RateNumber=${payload.rate}`)
  return httpService.post(baseUrl + `Course/SetCourseRating?CourseId=${payload.courseId}&RateNumber=${payload.rate}`);
};
