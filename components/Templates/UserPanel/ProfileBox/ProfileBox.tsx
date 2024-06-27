import React, { useEffect, useState } from "react";
import fallbackImage from "@/public/pictures/userPanel/userProfile.png";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import MainButton from "@/components/Modules/Button/MainButton";
import { useAddProfileImageApi, useDeleteProfileImageApi } from "@/hooks/api/usePanelApi";
import Image from "next/image";
import { Skeleton } from "@nextui-org/react";

export default function ProfileBox({ userImage, isLoading }: { userImage: any, isLoading: boolean }) {
  const [preview, setPreview] = useState<string>(fallbackImage.src)

  const { control, handleSubmit } = useForm();

  const { mutate: addProfileImageMutate, isPending: addProfileImagePending } = useAddProfileImageApi()

  const { mutate: deleteProfileImageMutate, isPending: deleteProfileImagePending } = useDeleteProfileImageApi()

  const changeImageHandler = (event: any, onChange: any) => {
    const file = event.target.files[0]
    onChange(file);

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  }

  const submitFormHandler: SubmitHandler<any> = (data) => {
    addProfileImageMutate(data)
  }

  useEffect(() => {
    if (userImage) {
      setPreview(userImage.puctureAddress)
    }
  }, [userImage])

  return (
    <>
      {isLoading ? <Skeleton className="rounded-full w-[150px] h-[150px]" /> : <Image
        src={preview}
        alt=""
        className="h-[150px] w-[150px] rounded-full object-cover"
        width={1000}
        height={1000}
      />}
      <form
        onSubmit={handleSubmit(submitFormHandler)}
        className="flex flex-col gap-5 mt-10"
      >
        <label htmlFor="fileInput" className="cursor-pointer font-vazir text-white py-3 px-4 bg-primary dark:bg-primary-darker flex justify-center items-center rounded-xl text-xl">
          آپلود عکس
        </label>
        <Controller name="formFile" rules={{ required: true }} control={control} render={({ field: { onChange } }) => (
          <input
            id="fileInput"
            type="file"
            name="image"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(event) => changeImageHandler(event, onChange)}
            className="hidden"
          />
        )} />
        <MainButton
          content={<p>ثبت</p>}
          type="submit"
          className="bg-primary dark:bg-primary-darker text-btnText w-full py-[1.5rem] text-xl"
          isLoading={addProfileImagePending}
        />
        <MainButton
          content={<p>حذف عکس</p>}
          className="bg-secondary text-btnText w-full py-[1.5rem] text-xl"
          isLoading={deleteProfileImagePending}
          onClick={() => deleteProfileImageMutate(userImage.id)}
        />
      </form>
    </>
  );
}