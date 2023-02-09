import { https } from "../utils/https";
import { Studentss as Students, Student } from "../@type/Blog";

export const getStudents = (page: number | string, limit: number | string) => {
  return https.get<Students>("students", {
    params: {
      _page: page,
      _limit: limit,
    },
  });
};

export const addStudent = (student: Omit<Student, "id">) => {
  return https.post<Student>("students", student);
};

export const getStudent = (id: number | string) => {
  return https.get<Student>(`students/${id}`);
};


export const updateStudent = (id: number | string, student: Student) => {
  return https.put<Student>(`students/${id}`, student);
};


export const deleteStudent = (id: number | string) => {
  return https.delete<{}>(`students/${id}`);
};
