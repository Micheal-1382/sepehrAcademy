interface newsCommentProps {
  id: string;
  autor: string | undefined;
  newsId: string;
  currentUserEmotion: "LIKED" | "-" | "DISSLIKED";
  currentUserLikeId: string;
  currentUserIsDissLike: boolean;
  currentUserIsLike: boolean;
  describe: string;
  dissLikeCount: number;
  inserDate: string;
  likeCount: number;
  parentId: string;
  pictureAddress: string;
  title: string;
  replyCount: number;
}

export type { newsCommentProps };
