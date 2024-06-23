import courseIcon from "@/public/pictures/teachers/course.svg";
import newspaperIcon from "@/public/icons/theme/newspaper.svg";
import linkedinIcon from "@/public/icons/theme/linkedin.svg";
import { teachers } from "@/interfaces/teacher.interface";
import { Card, CardBody, Chip, Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { validateImageAddress } from "@/utils/validateImageAdderss";
import fallbackImage from "@/public/pictures/teachers/arian.webp"
import convertToPersianDigit from "@/utils/convertToPersianDigit";

export default function TeacherCard({
  teacherId,
  fullName,
  linkdinProfileLink,
  courseCounts,
  newsCount,
  pictureAddress
}: teachers) {
  return (
    <Card
      isBlurred
      className="border-none w-full lg:w-[70%] flex p-4 bg-white dark:bg-dark-lighter shadow-none"
      shadow="sm"
    >
      <CardBody>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="relative w-full sm:w-[40%] lgb:[30%] h-auto md:h-[280px] rounded-3xl overflow-hidden">
            <Image src={validateImageAddress(pictureAddress, fallbackImage)} width={400} height={400} alt="" className="w-full object-fill" />
          </div>

          <div className="flex flex-col justify-start text-right w-full sm:w-[60%] lgb:[70%]">
            <h2 className="font-kalamehBlack mb-2 text-[24px] md:text-[29px] text-lightTitle dark:text-darkTitle">
              {fullName}
            </h2>
            <p
              className="text-[14px] font-peyda line-clamp-2 md:text-[16px] text-lightBody dark:text-darkBody"
              dir="rtl"
            >
              به جرعت میتونم بگم سخت گیرترین شرایط جذب مدرس داریم چون برامون مهمه محتوا خیلی ساده و روان بیان بشه که توی یادگیری به مشکل نخورید.
            </p>
            <div className="hidden sm:grid sm:grid-cols-2 gap-4 my-6 md:w-[80%] lg:w-full lgb:w-[80%]">
              <Chip
                startContent={<Image src={newspaperIcon} alt="" />}
                variant="solid"
                className="font-peyda rounded-xl text-white dark:text-darkTitle bg-lightBody dark:bg-dark px-4 h-12 max-w-none"
              >
                {convertToPersianDigit(newsCount)} مقاله
              </Chip>
              <Chip
                startContent={<Image src={courseIcon} alt="" />}
                variant="solid"
                className="font-peyda rounded-xl text-white dark:text-darkTitle bg-lightBody dark:bg-dark px-4 h-12 max-w-none"
              >
                {convertToPersianDigit(courseCounts)} دوره آموزشی
              </Chip>
              <Chip
                startContent={<Image src={linkedinIcon} width={25} alt="" />}
                variant="solid"
                className="font-peyda rounded-xl col-span-2 text-white dark:text-darkTitle bg-lightBody dark:bg-dark px-4 h-12 max-w-none min-w-full overflow-hidden"
              >
                {linkdinProfileLink && <Link href={linkdinProfileLink}>برو به لینکدین استاد</Link>}
              </Chip>
            </div>
          </div>
        </div>
        <Divider className="my-4" />
        <div className="flex justify-center items-center mt-2">
          <Link
            href={`teachers/${teacherId}`}
            className="md:col-start-3 col-span-1 mx-auto md:ms-auto md:mx-0 flex justify-center w-full items-center gap-x-2 text-lightTitle dark:text-darkTitle font-peyda"
          >
            <Divider className="w-[60px] rounded-full h-1 bg-lightBody dark:bg-darkBody" />
            مشاهده پروفایل
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}