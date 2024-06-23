import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import MainButton from "@/components/Modules/Button/MainButton";
import PrimaryInput from "@/components/Modules/Input/PrimaryInput";
import { profileInfoApiProps, profileInfoProps } from "@/interfaces/profile.interface";
import PrimaryTextarea from "@/components/Modules/Textarea/PrimaryTextarea";
import { Checkbox } from "@nextui-org/react";
import { useUpdateProfileInfoApi } from "@/hooks/api/usePanelApi";
import MainDatePicker from "@/components/Modules/DatePicker/MainDatePicker";

export default function PersonalInfoBox({ data, isLoading }: {
  isLoading: boolean,
  data: profileInfoProps
}) {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<profileInfoApiProps>();

  const { mutate: updateProfileInfoMutate, isPending: updateProfileInfoPending } = useUpdateProfileInfoApi()

  useEffect(() => {
    if (data) {
      reset({
        FName: data.fName,
        LName: data.lName,
        UserAbout: data.userAbout,
        LinkdinProfile: data.linkdinProfile,
        TelegramLink: data.telegramLink,
        ReceiveMessageEvent: data.receiveMessageEvent,
        HomeAdderess: data.homeAdderess,
        NationalCode: data.nationalCode,
        Gender: data.gender,
        // BirthDay: parseDate(data.birthDay?.toLocaleDateString()),
        Latitude: data.latitude,
        Longitude: data.longitude
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const submitFormHandler: SubmitHandler<profileInfoApiProps> = (data) => {
    const {
      year: birthYear,
      month: birthMonth,
      day: birthDayDate,
    } = data.BirthDay;

    const BirthDay = `${birthYear}-${birthMonth}-${birthDayDate}`;


    updateProfileInfoMutate({ ...data, BirthDay })
  };


  return (
    <>
      <div>
        <div className="font-kalamehBlack text-primary dark:text-primary-lighter text-2xl mt-8">تغییر اطلاعات فردی</div>
        <form
          onSubmit={handleSubmit(submitFormHandler)}
          className="flex flex-col gap-5 mt-8"
        >
          <PrimaryInput
            placeholder="نام"
            variant="faded"
            className="font-peyda"
            type="text"
            register={{
              ...register("FName", {
                required: false,
              }),
            }}
            isInvalid={Boolean(errors.FName)}
            errorMessage={errors.FName?.message}
          />
          <PrimaryInput
            placeholder="نام خانوادگی"
            variant="faded"
            className="font-peyda"
            type="text"
            register={{
              ...register("LName", {
                required: false,
              }),
            }}
            isInvalid={Boolean(errors.LName)}
            errorMessage={errors.LName?.message}
          />
          <PrimaryTextarea
            placeholder="درباره من"
            variant="faded"
            className="font-peyda"
            register={{
              ...register("UserAbout", {
                required: "نمیتونی درباره من رو خالی بذاری",
                minLength: {
                  value: 10,
                  message: "تعداد حروف درباره من باید بیشتر از ۱۰ حرف باشد"
                }
              }),
            }}
            isInvalid={Boolean(errors.UserAbout)}
            errorMessage={errors.UserAbout?.message}
          />
          <Controller name="BirthDay" control={control} render={({ field: { onChange, value } }) => (
            <MainDatePicker label="تاریخ تولد" onChange={onChange} value={value} />
          )} />
          <PrimaryInput
            placeholder="آدرس لینکدین"
            variant="faded"
            className="font-peyda"
            type="text"
            register={{
              ...register("LinkdinProfile", {
                required: false,
                pattern: {
                  value:
                    /https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9-]+\/?/g,
                  message: "آدرس لینکدین شما معتبر نیست"
                }
              }),
            }}
            isInvalid={Boolean(errors.LinkdinProfile)}
            errorMessage={errors.LinkdinProfile?.message}
          />
          <PrimaryInput
            placeholder="آدرس تلگرام"
            variant="faded"
            className="font-peyda"
            type="text"
            register={{
              ...register("TelegramLink", {
                required: false,
                pattern: {
                  value: /(?:https?:\/\/)?(?:www\.)?(?:t\.me|telegram\.me)\/([a-zA-Z0-9_]+)\/?(\S*)?/g,
                  message: "آدرس تلگرام شما معتبر نیست"
                }
              }),
            }}
            isInvalid={Boolean(errors.TelegramLink)}
            errorMessage={errors.TelegramLink?.message}
          />
          <PrimaryInput
            placeholder="آدرس منزل"
            variant="faded"
            className="font-peyda"
            type="text"
            register={{
              ...register("HomeAdderess", {
                required: "ادرس منزل رو نمیتونی خالی بذاری",
                minLength: {
                  value: 10,
                  message: "تعداد حروف درباره من باید بیشتر از ۱۰ حرف باشد"
                }
              }),
            }}
            isInvalid={Boolean(errors.HomeAdderess)}
            errorMessage={errors.HomeAdderess?.message}
          />
          <PrimaryInput
            placeholder="کد ملی"
            variant="faded"
            className="font-peyda"
            type="number"
            register={{
              ...register("NationalCode", {
                required: "کد ملی رو نمیتونی خالی بذاری",

              }),
            }}
            isInvalid={Boolean(errors.NationalCode)}
            errorMessage={errors.NationalCode?.message}
          />
          <Controller name="ReceiveMessageEvent" control={control} render={({ field: { onChange, value } }) => (
            <Checkbox isSelected={value} onChange={(newValue) => onChange(newValue)} className="font-peyda" classNames={{
              label: ["text-slate-500"]
            }}>اطلاع رسانی از طریق پیامک</Checkbox>
          )} />

          <MainButton
            content={<p>ثبت</p>}
            type="submit"
            className="bg-primary dark:bg-primary-darker text-btnText w-full py-[1.5rem] text-xl"
            isLoading={updateProfileInfoPending}
          />
        </form>
      </div>
    </>
  )
}
