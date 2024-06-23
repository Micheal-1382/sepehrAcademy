import Image from "next/image";
import React from "react";
import heroImage from "@/public/icons/hero/header-img.svg";
import search from "@/public/icons/hero/search.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { NewsLetterFormType } from "@/interfaces/newsLetterForm.interface";
import PrimaryInput from "@/components/Modules/Input/PrimaryInput";
import Typewriter from "typewriter-effect";
import { useGetLandingApi } from "@/hooks/api/useLandingApi";
import teacher from "@/public/icons/hero/teacher.svg";
import news from "@/public/icons/hero/news.svg";
import course from "@/public/icons/hero/course.svg";
import student from "@/public/icons/hero/student.svg";
import CountUp from 'react-countup';
import { Spinner } from "@nextui-org/react";

function Hero() {
  const { register, handleSubmit } = useForm<NewsLetterFormType>();

  const submitFormHandler: SubmitHandler<NewsLetterFormType> = (data) => {
    console.log(data);
  };

  const getLandingInfo = useGetLandingApi();
  const { data, isLoading } = getLandingInfo;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="w-full md:w-2/5 flex flex-col gap-8">
          <div className="flex flex-col gap-2 justify-center text-center md:text-right">
            <h1 className="text-primary dark:text-primary-lighter text-3xl lgl:text-4xl lg:text-[41px] xl:text-[43px] mb-1 font-bold font-peyda">
              <Typewriter
                options={{
                  strings: ["دنبال چی می گردی؟"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
            <p className="text-lightBody dark:text-darkBody text-lg">
              دیگه وقتشه یه تکونی به خودت بدی…
            </p>
            <div className="lg:ml-16 relative">
              <form onSubmit={handleSubmit(submitFormHandler)}>
                <PrimaryInput
                  placeholder="چیزی که دنبالشی رو اینجا بنویس..."
                  variant="faded"
                  className="font-peyda w-full"
                  register={{
                    ...register("email", {
                      required: true,
                    }),
                  }}
                />
              </form>
              <Image
                className="absolute left-[10px] top-[10px] rounded-[18px] cursor-pointer"
                src={search}
                width={48}
                height={48}
                alt=""
              />
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-2 justify-center text-center md:text-right">
            <h1 className="text-secondary dark:text-secondary text-1x2 lg:text-[30px] font-bold font-peyda">
              آکادمی سپهر
            </h1>
            <p className="text-lightBody dark:text-darkBodytext-[16px]">
              آکادمی آموزشی سپهر مکانی برای پیشرفت تو تا بتونی مهارت های مورد
              نیاز برای طراحی وب با بهترین روش یاد بگیری
            </p>
          </div>
        </div>
        <div className="w-3/5 hidden md:block">
          <Image
            alt=""
            className="xl:-translate-x-10 lg:-translate-x-5 -translate-x-3"
            src={heroImage}
          />
        </div>
      </div>
      <div className="flex gap-28 justify-center mt-40">
        <div className="flex items-center flex-col gap-5 text-primary dark:text-primary-lighter">
          <Image alt="" className="w-20" src={teacher} />
          <div className="font-peyda text-xl">
            {!isLoading ? <CountUp end={data.teacherCount} duration={4} /> : <Spinner />}
          </div>
        </div>
        <div className="flex items-center flex-col gap-5 text-primary dark:text-primary-lighter">
          <Image alt="" className="w-20" src={student} />
          <div className="font-peyda text-xl">
            {!isLoading ? <CountUp end={data.studentCount} duration={4} /> : <Spinner />}
          </div>
        </div>
        <div className="flex items-center flex-col gap-5 text-primary dark:text-primary-lighter">
          <Image alt="" className="w-20" src={news} />
          <div className="font-peyda text-xl">
            {!isLoading ? <CountUp end={data.newsCount} duration={4} /> : <Spinner />}
          </div>
        </div>
        <div className="flex items-center flex-col gap-5 text-primary dark:text-primary-lighter">
          <Image alt="" className="w-20" src={course} />
          <div className="font-peyda text-xl">
            {!isLoading ? <CountUp end={data.courseCount} duration={4} /> : <Spinner />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
