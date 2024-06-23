import React, { useState } from "react";
import UserCard from "@/components/Modules/UserCard/UserCard";
import { Card, CardHeader, Divider, Spinner } from "@nextui-org/react";
import { CommentCard as CommentCardType } from "@/interfaces/commentCard.interface";
import Image from "next/image";
import replyIcon from "@/public/icons/theme/reply.svg";
import outlineLikeIcon from "@/public/icons/outlined/like.svg";
import solidLikeIcon from "@/public/icons/solid/like.svg";
import outlineDislikeIcon from "@/public/icons/outlined/dislike.svg";
import solidDislikeIcon from "@/public/icons/solid/dislike.svg";
import { useRouter } from "next/router";
import {
  useAddCourseCommentDissLikeApi,
  useAddCourseCommentLikeApi,
  useGetCourseSubCommentApi,
} from "@/hooks/api/useCoursesApi";
import CourseCommentCard from "@/components/Templates/Courses/CommentCard/CourseCommentCard";
import BlogCommentCard from "@/components/Templates/Blogs/CommentCard/BlogsCommentCard";
import convertToPersianDigit from "@/utils/convertToPersianDigit";
import SkeletonCommentCard from "@/components/Modules/SkeletonCommentCard/SkeletonCommentCard";
import MainButton from "@/components/Modules/Button/MainButton";

interface detectReplyToWhichUser {
  detectReplyToWhichUser?: ((userName: string | null) => void) | any;
}

type CourseCommentCard = CommentCardType & detectReplyToWhichUser & any;

function CommentCard({
  id,
  courseId,
  parentId,
  title,
  describe,
  author,
  userId,
  insertDate,
  disslikeCount,
  likeCount,
  currentUserEmotion,
  pictureAddress,
  detectReplyToWhichUser,
  acceptReplysCount,
  isReplay,
}: CourseCommentCard) {
  const router = useRouter();
  const { pathname, query } = router;
  const isInCoursePage = pathname.includes("courses");

  const {
    mutate: addCourseCommentLikeMutate,
    isPending: addCourseCommentLikePending,
  } = useAddCourseCommentLikeApi(courseId);

  const {
    mutate: addCourseCommentDissLikeMutate,
    isPending: addCourseCommentDissLikePending,
  } = useAddCourseCommentDissLikeApi(courseId);

  const commentDate = new Date(insertDate).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  const navigateToCommentForm = () => {
    window.scrollTo({
      top: 1750,
      behavior: "smooth",
    });

    detectReplyToWhichUser(author);
    router.push({ pathname, query: { ...query, CommentId: id } }, undefined, {
      shallow: true,
    });
  };

  const likeCommentHandler = () => {
    return addCourseCommentLikeMutate(id);
  };

  const dislikeCommentHandler = () => {
    return addCourseCommentDissLikeMutate(id);
  };
  const [commentId, setCommentId] = useState<any>(null);
  const {
    data: subCommentsData,
    isLoading: isSubCommentsLoading,
    refetch,
  } = useGetCourseSubCommentApi(commentId, query.courseId);

  const getReplaysHandler = () => {
    setCommentId(id);
  };

  return (
    <Card
      className={`${parentId
          ? `${isReplay ? "bg-white" : "bg-mainBodyBg"} dark:${isReplay ? "bg-dark-lighter" : "bg-dark"
          }`
          : "bg-white dark:bg-dark-lighter"
        } rounded-3xl p-4 shadow-none`}
    >
      <CardHeader className="pb-6 px-0 flex justify-between">
        <div className="flex flex-col space-y-4">
          <UserCard
            title={author ?? "بدون نام"}
            description={userId ? "مدرس دوره" : "دانشجو"}
            image={pictureAddress}
            size={35}
          />
          <span className="font-peyda text-sm">{commentDate}</span>
        </div>
        <div className="flex items-start gap-2">
          <button className="flex flex-col items-center gap-1">
            {currentUserEmotion === "DISSLIKED" ? (
              <Image src={solidDislikeIcon} alt="" className="cursor-pointer" />
            ) : addCourseCommentDissLikePending ? (
              <Spinner size="sm" />
            ) : (
              <>
                <Image
                  src={outlineDislikeIcon}
                  alt=""
                  className="cursor-pointer"
                  onClick={dislikeCommentHandler}
                />
              </>
            )}
            <span className="text-xs font-peyda">
              {convertToPersianDigit(disslikeCount)}
            </span>
          </button>
          <button className="flex flex-col items-center gap-1">
            {currentUserEmotion === "LIKED" ? (
              <Image src={solidLikeIcon} alt="" className="cursor-pointer" />
            ) : addCourseCommentLikePending ? (
              <Spinner size="sm" />
            ) : (
              <Image
                src={outlineLikeIcon}
                alt=""
                className="cursor-pointer"
                onClick={likeCommentHandler}
              />
            )}
            <span className="text-xs font-peyda">
              {convertToPersianDigit(likeCount)}
            </span>
          </button>
          {!isReplay && (
            <button className="flex flex-col items-center gap-1">
              <Image
                src={replyIcon}
                alt=""
                onClick={navigateToCommentForm}
                className="cursor-pointer"
              />
              <span className="text-xs font-peyda">
                {convertToPersianDigit(0)}
              </span>
            </button>
          )}
        </div>
      </CardHeader>
      <Divider className="mb-6" />
      <p className="text-lightBody dark:text-darkBody text-sm lgb:text-[14px] leading-7">
        {title}
        {describe}
      </p>

      {acceptReplysCount !== 0 && <MainButton
        className="bg-primary my-10 w-[150px] dark:bg-primary-darker text-btnText px-8 py-3 lgb:px-10 lgb:py-6 rounded-3x text-md"
        content={<p>مشاهده پاسخ ها</p>}
        isLoading={isSubCommentsLoading}
        onClick={getReplaysHandler}
      />}

      <div className="flex flex-col gap-5 text-right mt-4">
        {isSubCommentsLoading
          ? Array.from({ length: 6 }, (_, index) => (
            <SkeletonCommentCard key={index} />
          ))
          : subCommentsData?.map((comment: any) => (
            <>
              {isInCoursePage ? (
                <CourseCommentCard
                  isReplay={true}
                  refetch={refetch}
                  {...comment}
                  key={comment?.id}
                  detectReplyToWhichUser={detectReplyToWhichUser}
                />
              ) : (
                <BlogCommentCard
                  {...comment}
                  key={comment?.id}
                  detectReplyToWhichUser={detectReplyToWhichUser}
                />
              )}
            </>
          ))}
        {subCommentsData?.length === 0 && (
          <p className="font-peyda text-sm text-secondary">
            تا الان هیچ بازخوردی برای این نظر ثبت نشده است!
          </p>
        )}
      </div>
    </Card>
  );
}

export default CommentCard;
