interface Blog {
  addUserFullName: string | undefined;
  addUserProfileImage: string;
  currentDissLikeCount: number;
  currentImageAddressTumb: string;
  currentLikeCount: number;
  currentRate: number;
  currentUserFavoriteId: string;
  currentUserIsDissLike: boolean;
  currentUserIsLike: boolean;
  currentUserRateNumber: number;
  currentUserSetRate: number;
  currentView: number;
  id: string;
  newsId?: string;
  insertDate: string;
  isActive: boolean;
  isCurrentUserFavorite: boolean;
  keyword: string;
  likeId: string;
  miniDescribe: string;
  newsCatregoryId: number;
  newsCatregoryName: string;
  title: string;
  totalCount: number;
  updateDate: string;
}

export type { Blog };
