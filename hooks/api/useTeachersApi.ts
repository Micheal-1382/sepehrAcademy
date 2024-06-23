import {
  getTeacherCourseApi,
  getTeacherDetailsApi,
  getTeachersApi,
} from "@/services/api/teachersApi";
import { useQuery } from "@tanstack/react-query";

export const useGetTeachersApi = () => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: () => getTeachersApi().then((data) => data.data),
  });
};

export const useGetTeacherDetailsApi = (
  TeacherId: string | string[] | undefined
) => {
  return useQuery({
    queryKey: ["teacherDetails", TeacherId],
    queryFn: () => getTeacherDetailsApi(TeacherId).then((data) => data.data),
    enabled: !!TeacherId,
  });
};

export const useGetTeacherCourseApi = (
  TeacherId: string | string[] | undefined
) => {
  return useQuery({
    queryKey: ["teacherCourse"],
    queryFn: () => getTeacherCourseApi(TeacherId).then((data) => data.data),
    enabled: !!TeacherId,
  });
};
