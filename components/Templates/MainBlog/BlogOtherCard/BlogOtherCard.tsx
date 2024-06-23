import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Blog } from "@/interfaces/blog.interface";
import { validateImageAddress } from "@/utils/validateImageAdderss";
import fallbackImage from "@/public/pictures/blog/blogImage.jpg"

function BlogOtherCard({ currentImageAddressTumb, title, miniDescribe, newsId }: Blog) {
  const router = useRouter();
  return (
    <div className="pt-[55px] cursor-pointer" onClick={() => router.push(`/blogs/${newsId}`)}>
      <div className="flex py-6 bg-white dark:bg-dark-lighter flex-col gap-4 rounded-3xl h-full">
        <div className="w-full flex flex-col items-center gap-5">
          <div className="overflow-hidden rounded-[38px] w-[85%] -mt-20">
            <Image src={validateImageAddress(currentImageAddressTumb, fallbackImage)} width={400} height={400} alt="" />
          </div>
          <div className="w-[85%] flex flex-col gap-4">
            <h2 className="text-[20px] overflow-hidden font-peyda font-bold text-lightTitle dark:text-darkTitle">
              {title}
            </h2>
            <p className="text-[15px] font-vazir font-bold text-lightBody dark:text-darkBody line-clamp-2">
              {miniDescribe}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogOtherCard;
