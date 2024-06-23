import { useGetTeachersApi } from "@/hooks/api/useTeachersApi";
import { validateImageAddress } from "@/utils/validateImageAdderss";
import { Card, CardBody, Divider } from "@nextui-org/react";
import SkeletonSuggestedTeacherCard from "@/components/Templates/MainTeacher/SkeletonSuggestedTeacherCard"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import fallbackImage from "@/public/pictures/defaultUser.png"

export default function SuggestedTeacherCard() {
  const { data, isLoading } = useGetTeachersApi()
  return (
    <>
      {!isLoading ?
        <Link href={`/teachers/${data[9]?.teacherId}`} className="cursor-pointer">
          <Card className="bg-white dark:bg-dark-lighter overflow-visible w-fit ms-auto -mt-20 shadow-md dark:shadow-none">
            <CardBody className="flex items-center flex-row gap-2 overflow-visible py-0">
              <Image
                alt=""
                src={validateImageAddress(data[9]?.pictureAddress, fallbackImage)}
                width={150}
                height={150}
                className="w-16 h-16 object-cover rounded-xl -translate-y-7"
              />
              <div className="flex items-center gap-2 font-bold">
                <span className="text-lightBody dark:text-darkBody text-sm">
                  رفتن به صفحه
                </span>
                <span className="text-lightTitle dark:text-darkTitle">{data[9]?.fullName}</span>
                <Divider className="w-[35px] h-[2px] bg-primary dark:bg-primary-lighter" />
              </div>
            </CardBody>
          </Card>
        </Link> :
        <SkeletonSuggestedTeacherCard />
      }
    </>
  );
}
