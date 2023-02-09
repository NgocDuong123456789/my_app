import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "react-query";
import classNames from "classnames";

import { getStudents } from "../../../apis/students.api";
import { useQueryString } from "../../../utils/utils";
import { deleteStudent } from "../../../apis/students.api";
import { getStudent } from "../../../apis/students.api";

const LIMIT = 10;

export default function Students() {
  // const [students, setStudents] = useState<StudentType>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // useEffect(() => {
  //   setIsLoading(true);
  //   getStudents(1, 10)
  //     .then((res) => {
  //       setStudents(res.data);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  const queryClient = useQueryClient();
  const queryString: { page?: string } = useQueryString();
  const page = Number(queryString.page) || 1;

  const result = useQuery({
    queryKey: ["students", page], // giống bên gọi axios , page chính là page 1,2
    queryFn: () => getStudents(page, 10), // là 1 func gọi api
    keepPreviousData: true, // giữ lại data trước đó và isloading=false khi fetching thành công thì isloading=false và cập nhật lại data để cải thiện về mặt  UI
  });

  const { data, isLoading } = result;
  const deleteStudentMutation = useMutation({
    mutationFn: (id: string | number) => deleteStudent(id),
    onSuccess: (data, id) => {
      toast.success(`xóa thành công ${id}`);
      // có 2 cách
      // cách 1l
      // khi gọi nó sẽ gọi mutationFn cập nhật api và dữ liệu
      queryClient.invalidateQueries({ queryKey: ["students", page] });
      // cách 2
      // queryClient.invalidateQueries({queryKey:['students'],exact:true})
    },
  });

  const handleDelete = (id: string | number) => {
    deleteStudentMutation.mutate(id);
  };

  const totalStudent = Number(data?.headers["x-total-count"] || 0);
  const totalPage = Math.ceil(totalStudent / LIMIT);

  // hàm dùng để lấy thông tin chi tiết nhanh khi người dùng hover vào
  //hover vào item thì cho fetch api 
  const handlePrefetchStudent = (id: string | number) => {
    queryClient.prefetchQuery(["student", String(id)], {
      queryFn: () => getStudent(id),
    });
  };

  return (
    <div>
      <h1 className="text-lg">Students</h1>
      <Link
        to="/students/add"
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add student
      </Link>
      {isLoading && (
        <div role="status" className="mt-6 animate-pulse">
          <div className="mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10  rounded bg-gray-200 dark:bg-gray-700" />
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="relative mt-6 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    #
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Avatar
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((student) => {
                  return (
                    <tr
                      onMouseEnter={() => handlePrefetchStudent(student.id)}
                      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                      key={student.id}
                    >
                      <td className="py-4 px-6">{student.id}</td>
                      <td className="py-4 px-6">
                        <img
                          src={student.avatar}
                          alt="student"
                          className="h-5 w-5"
                        />
                      </td>
                      <th
                        scope="row"
                        className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                      >
                        {student.last_name}
                      </th>
                      <td className="py-4 px-6">{student.last_name}</td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          to={`/students/${student.id}`}
                          className="mr-5 font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="font-medium text-red-600 dark:text-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center">
            <nav aria-label="Page navigation example">
              <ul className="inline-flex -space-x-px">
                <li>
                  {page === 1 ? (
                    <span className="cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      Previous
                    </span>
                  ) : (
                    <Link
                      to={`/students?page=${page - 1}`}
                      className=" rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      Previous
                    </Link>
                  )}
                </li>
                {Array(totalPage)
                  .fill(0)
                  .map((_, index) => {
                    const pageNumber = index + 1;
                    const isActive = Boolean(pageNumber === page);
                    return (
                      <li key={index}>
                        <Link
                          className={classNames(
                            "border border-gray-300  py-2 px-3 leading-tight text-gray-500   hover:bg-gray-100   hover:text-gray-700",
                            {
                              "bg-gray-100 text-gray-700": isActive,
                              "bg-white text-gray-500": !isActive,
                            }
                          )}
                          to={`/students?page=${pageNumber}`}
                        >
                          {pageNumber}
                        </Link>
                      </li>
                    );
                  })}

                <li>
                  {page === totalPage ? (
                    <span className="rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                      Next
                    </span>
                  ) : (
                    <Link
                      className="rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      to={`/students?page=${page + 1}`}
                    >
                      Next
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
