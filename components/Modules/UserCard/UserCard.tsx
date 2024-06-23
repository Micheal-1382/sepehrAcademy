import { UserCardType } from "@/interfaces/userCard.interface";
import { validateImageAddress } from "@/utils/validateImageAdderss";
import fallbackImage from "@/public/pictures/defaultUser.png"
import Image from "next/image";
import React from "react";

export default function UserCard({
  title,
  description,
  image,
  size,
}: UserCardType) {
  return (
    <div className="flex gap-x-4">
      <div>
        <Image src={validateImageAddress(image, fallbackImage)} alt="" width={size} height={size} className="rounded-full" />
      </div>
      <div>
        <p className="text-2xl text-primary dark:text-primary-lighter mb-0.1 font-kalamehBlack">
          {title}
        </p>
        <p className="text-xs text-lightBody dark:text-darkBody">
          {description}
        </p>
      </div>
    </div>
  );
}
