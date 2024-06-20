import Image from "next/image";
import React from "react";
import { Blog } from "@/interfaces/blog.interface";
import Link from "next/link";
import { validateImageAddress } from "@/utils/validateImageAdderss";
import fallbackImage from "@/public/pictures/blog/blogImage.jpg";
import {
  useAddNewsFavoriteApi,
  useDeleteNewsFavoriteApi,
} from "@/hooks/api/useNewsApi";
import { Spinner } from "@nextui-org/react";
import MainTooltip from "@/components/Modules/MainTooltip/MainTooltip";
import heart from "@/public/pictures/courses/heart.svg";
import fillHeart from "@/public/pictures/courses/fillHeart.svg";
import { useRouter } from "next/router";

export default function BlogCard(data: Blog) {
  const { mutate: addNewsFavoriteMutate, isPending: addNewsFavoriteIsPending } =
    useAddNewsFavoriteApi();
  
  const router = useRouter();

  const {
    mutate: deleteNewsFavoriteMutate,
    isPending: deleteNewsFavoriteIsPending,
  } = useDeleteNewsFavoriteApi();

  const newsId = data.id;
  const likeId = data.currentUserFavoriteId

  const likeCommentHandler = (event: any) => {
    event.stopPropagation();
    addNewsFavoriteMutate({ NewsId: newsId });
  };

  const dislikeCommentHandler = (event: any) => {
    event.stopPropagation();
    deleteNewsFavoriteMutate({deleteEntityId: likeId});
  };
  return (
    <div
      className={`border-l-2 col-span-4 relative md:col-span-2 lg:col-span-1 border-lightTitle dark:border-darkTitle px-2 gap-y-2 flex flex-col`}
      onClick={() => router.push(`/blogs/${data.id}`)}
    >
      <div className="relative">
      <div className="p-3 absolute top-0 left-0">
        {!data.isCurrentUserFavorite ? (
          addNewsFavoriteIsPending ? (
            <Spinner size="sm" />
          ) : (
            <MainTooltip content="افزودن به علاقه مندی">
              <Image
                src={heart}
                alt=""
                width={40}
                height={40}
                onClick={(event) => likeCommentHandler(event)}
                className="h-full w-full"
              />
            </MainTooltip>
          )
        ) : deleteNewsFavoriteIsPending ? (
          <Spinner size="sm" />
        ) : (
          <MainTooltip content="حذف از علاقه مندی">
            <Image
              src={fillHeart}
              alt=""
              width={40}
              height={40}
              onClick={(event) => dislikeCommentHandler(event)}
              className="h-full w-full"
            />
          </MainTooltip>
        )}
        </div>
        <Image
          src={validateImageAddress(
            data.currentImageAddressTumb,
            fallbackImage
          )}
          width={400}
          height={400}
          alt=""
          priority={true}
        />
      </div>
      <div>
        <h2 className="text-lightTitle overflow-hidden dark:text-darkTitle text-2xl font-kalamehBlack mb-1">
          {data.title}
        </h2>
        <p className="text-lightBody dark:text-darkBody font-peyda line-clamp-3">
          {data.miniDescribe}
        </p>
      </div>
    </div>
  );
}
