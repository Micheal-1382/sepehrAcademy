import CourseCard from '@/components/Modules/CourseCard/CourseCard';
import SkeletonCourseCard from '@/components/Modules/CourseCard/SkeletonCourseCard';
import { useGetMyFavoriteCoursesApi } from '@/hooks/api/usePanelApi'
import { FavoriteCourse } from '@/interfaces/course.interface';
import React from 'react'

export default function CourseFavoritesBox() {
    const { data, isLoading } = useGetMyFavoriteCoursesApi()

    return (
        <>
            <h2 className="font-peyda text-[20px] lg:text-[30px] text-primary dark:text-primary-lighter mt-12 mb-6">
                دوره های مورد علاقه من
            </h2>
            <div className='grid grid-cols-3 gap-4'>
                {isLoading ? Array.from({ length: 4 }, (_, index) => (
                    <SkeletonCourseCard key={index} />
                )) : data?.favoriteCourseDto.map((course: FavoriteCourse, index: number) => (
                    <CourseCard key={index} title={course.courseTitle} courseId={course.courseId} describe={course.describe} lastUpdate={course.lastUpdate} tumbImageAddress={course.tumbImageAddress} teacherName={course.teacheName} />
                ))}
            </div>
        </>
    )
}
