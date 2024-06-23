import CourseCard from '@/components/Modules/CourseCard/CourseCard';
import SkeletonCourseCard from '@/components/Modules/CourseCard/SkeletonCourseCard';
import { useGetMyFavoriteCoursesApi } from '@/hooks/api/usePanelApi'
import { FavoriteCourse } from '@/interfaces/course.interface';
import React from 'react'

export default function CourseFavoritesBox() {
    const { data, isLoading } = useGetMyFavoriteCoursesApi()

    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lgb:grid-cols-3 gap-4'>
                {isLoading ? Array.from({ length: 4 }, (_, index) => (
                    <SkeletonCourseCard key={index} />
                )) : data?.favoriteCourseDto.map((course: FavoriteCourse, index: number) => (
                    <CourseCard key={index} title={course.courseTitle} courseId={course.courseId} describe={course.describe} lastUpdate={course.lastUpdate} tumbImageAddress={course.tumbImageAddress} teacherName={course.teacheName} />
                ))}
            </div>
        </>
    )
}
