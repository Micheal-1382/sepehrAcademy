interface Course {
  courseId: string;
  title: string;
  tumbImageAddress: string;
  describe: string;
  cost?: string;
  teacherName: string;
  courseRate?: number;
  courseReserveId?: string;
  currentUserRateNumber?: number;
  currentUserSetRate?: boolean;
  dissLikeCount?: number;
  likeCount?: number;
  isCourseReseve?: boolean;
  userFavorite?: boolean;
  isUserFavorite?: boolean;
  lastUpdate: string;
  levelName?: string;
  statusName?: string;
  typeName?: string;
  userFavoriteId?: string;
  userIsDissLiked?: boolean;
  userIsLiked?: boolean;
  userLikeId?: string;
}

interface FavoriteCourse {
  teacheName: string;
  levelName: string;
  courseTitle: string;
  describe: string;
  tumbImageAddress: string;
  typeName: string;
  lastUpdate: string;
  courseId: string;
  favoriteId: string;
  teacherId: number;
}
export type { Course, FavoriteCourse };
