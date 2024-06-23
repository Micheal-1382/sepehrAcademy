import {
  Card,
  Checkbox,
  Switch,
  AccordionItem,
  Accordion,
  CheckboxGroup,
  Skeleton,
} from "@nextui-org/react";
import React from "react";
import { useRouter } from "next/router";
import { useGetAllCourseLevelApi, useGetCourseTypesApi, useGetTechnologiesApi } from "@/hooks/api/useCoursesApi";
import { courseLevelProps } from "@/interfaces/courseLevel.interface";
import { courseTypesProps } from "@/interfaces/courseTypes.interface";
import { technologiesProps } from "@/interfaces/technologies.interface";
import { useGetTeachersApi } from "@/hooks/api/useTeachersApi";
import { teachers } from "@/interfaces/teacher.interface";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { courseVerticalFilterProps } from "@/interfaces/courseVerticalFilter.interface";
import MainButton from "@/components/Modules/Button/MainButton";

export default function CourseVerticalFilterBox() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<courseVerticalFilterProps>()

  const { pathname, query } = useRouter()

  const { data: courseLevelData, isLoading: courseLevelIsLoading } = useGetAllCourseLevelApi()

  const { data: courseTypesData, isLoading: courseTypesIsLoading } = useGetCourseTypesApi()

  const { data: technologiesData, isLoading: technologiesIsLoading } = useGetTechnologiesApi()

  const { data: teachersData, isLoading: teachersIsLoading } = useGetTeachersApi()

  const clearAllFiltersHanlder = () => {
    router.push({
      pathname
    })
  }
  const submitFormHandler: SubmitHandler<courseVerticalFilterProps> = (data) => {
    const TechCount = data.ListTech ? data.ListTech.length : 0

    if (data.ListTech) {
      data.ListTech = data.ListTech?.join(",") || "";
    }
    if (data.courseLevelId) {
      data.ListTech = data.courseLevelId?.join(",") || "";
    }

    if (data.CourseTypeId) {
      data.ListTech = data.CourseTypeId?.join(",") || "";
    }
    if (data.TeacherId) {
      data.TeacherId = data.TeacherId?.join(",") || "";
    }

    const newQuery = {
      ...query,
      ...data,
      TechCount
    }

    router.push({
      pathname,
      query: newQuery
    })
  }

  return (
    <div className="w-[100%] md:w-[30%] lg:w-[22%] mb-6">
      <div className="grid grid-cols-2 md:grid-cols-1 bg-white p-4 rounded-xl gap-5 dark:bg-dark-lighter">
        <h2 className="col-span-2 md:col-span-1 font-peyda text-[18px] lg:text-[20px] text-lightTitle dark:text-darkTitle">
          فیلتر ها
        </h2>
        <form onSubmit={handleSubmit(submitFormHandler)} className="space-y-5">
          <MainButton content="پاک کردن فیلتر" className="bg-secondary dark:bg-secondary text-btnText w-full font-peyda" onClick={clearAllFiltersHanlder} />
          <MainButton content="جستجو" className="bg-primary dark:bg-primary-darker text-btnText w-full font-peyda" type="submit" />
          <Card
            className="shadow-none p-3 bg-mainBodyBg dark:bg-dark flex flex-row items-center justify-between gap-1"
            dir="rtl"
          >
            <p>تکمیل شده</p>
            <Controller defaultValue={false} name="isCompleted" control={control} render={({ field: { onChange, value } }) => (
              <Switch
                isSelected={value}
                onChange={(event) => {
                  onChange(event.target.checked)
                }}
              />
            )} />
          </Card>
          <Card
            className="shadow-none p-3 bg-mainBodyBg dark:bg-dark flex flex-row justify-between gap-1"
            dir="rtl"
          >
            <p>رایگان</p>
            <Controller defaultValue={false} name="isFree" control={control} render={({ field: { onChange, value } }) => (
              <Switch
                isSelected={value}
                onChange={(event) => {
                  onChange(event.target.checked)
                }}
              />
            )} />
          </Card>
          <Accordion variant="splitted" className="font-vazir px-0">
            <AccordionItem
              key={1}
              className="!shadow-none !bg-mainBodyBg dark:!bg-dark text-lightTitle dark:text-darkTitle"
              aria-label="دسته بندی"
              title={<p className="text-sm lgb:text-lg">دسته بندی</p>}
            >
              {technologiesIsLoading ?
                <div className="space-y-3">
                  {Array.from({ length: 4 }, (_, index) => (
                    <Skeleton className="rounded-md h-[20px] w-2/3" key={index} />
                  ))}
                </div> :
                <Controller defaultValue={[]} name="ListTech" control={control} render={({ field: { onChange, value } }) => (
                  <CheckboxGroup
                    value={value}
                    classNames={{
                      wrapper: ["gap-y-4 pb-2"],
                    }}
                    onChange={(newValue) => onChange(newValue)}
                    color="success"
                  >
                    {technologiesData.filter((item: technologiesProps) => item.parentId === null).map((item: technologiesProps, index: number) => (
                      <Checkbox
                        key={index}
                        className="checkBoxContainer"
                        value={item.id.toString()}
                      >
                        <p className="flex justify-between text-sm">{item.techName}</p>
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                )} />}
            </AccordionItem>
            <AccordionItem
              key={2}
              className="!shadow-none !bg-mainBodyBg dark:!bg-dark text-lightTitle dark:text-darkTitle"
              aria-label="سطح دوره ها"
              title={<p className="text-sm lgb:text-lg">سطح دوره</p>}
            >
              {courseLevelIsLoading ?
                <div className="space-y-3">
                  {Array.from({ length: 3 }, (_, index) => (
                    <Skeleton className="rounded-md h-[20px] w-2/3" key={index} />
                  ))}
                </div> :
                <Controller defaultValue={[]} name="courseLevelId" control={control} render={({ field: { onChange, value } }) => (
                  <CheckboxGroup
                    value={value}
                    classNames={{
                      wrapper: ["gap-y-4 pb-2"],
                    }}
                    onChange={(newValue) => onChange(newValue)}
                    color="success"
                  >
                    {courseLevelData.map((item: courseLevelProps, index: number) => (
                      <Checkbox
                        key={index}
                        className="checkBoxContainer"
                        value={item.id.toString()}
                      >
                        <p className="flex justify-between text-sm">{item.levelName}</p>
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                )} />}
            </AccordionItem>
            <AccordionItem
              key={3}
              className="!shadow-none !bg-mainBodyBg dark:!bg-dark text-lightTitle dark:text-darkTitle"
              aria-label="نوع دوره"
              title={<p className="text-sm lgb:text-lg">نوع دوره</p>}
            >
              {courseTypesIsLoading ?
                <div className="space-y-3">
                  {Array.from({ length: 3 }, (_, index) => (
                    <Skeleton className="rounded-md h-[20px] w-2/3" key={index} />
                  ))}
                </div> :
                <Controller defaultValue={[]} name="CourseTypeId" control={control} render={({ field: { onChange, value } }) => (
                  <CheckboxGroup
                    value={value}
                    classNames={{
                      wrapper: ["gap-y-4 pb-2"],
                    }}
                    onChange={(newValue) => onChange(newValue)}
                    color="success"
                  >
                    {courseTypesData.map((item: courseTypesProps, index: number) => (
                      <Checkbox
                        key={index}
                        className="checkBoxContainer"
                        value={item.id.toString()}
                      >
                        <p className="flex justify-between text-sm">{item.typeName}</p>
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                )} />}
            </AccordionItem>
            <AccordionItem
              key={4}
              className="!shadow-none !bg-mainBodyBg dark:!bg-dark text-lightTitle dark:text-darkTitle"
              aria-label="اساتید"
              title={<p className="text-sm lgb:text-lg">اساتید</p>}
            >
              {teachersIsLoading ?
                <div className="space-y-3">
                  {Array.from({ length: 4 }, (_, index) => (
                    <Skeleton className="rounded-md h-[20px] w-2/3" key={index} />
                  ))}
                </div> :
                <Controller defaultValue={[]} name="TeacherId" control={control} render={({ field: { onChange, value } }) => (
                  <CheckboxGroup
                    value={value}
                    classNames={{
                      wrapper: ["gap-y-4 pb-2"],
                    }}
                    onChange={(newValue) => onChange(newValue)}
                    color="success"
                  >
                    {teachersData.map((item: teachers, index: number) => (
                      <Checkbox
                        key={index}
                        className="checkBoxContainer"
                        value={item.teacherId.toString()}
                      >
                        <p className="flex justify-between text-sm">{item.fullName}</p>
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                )} />}
            </AccordionItem>
          </Accordion>
        </form>
      </div>
    </div>
  );
}
