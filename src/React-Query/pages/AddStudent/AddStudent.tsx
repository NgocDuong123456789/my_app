import { useMutation, useQuery, useQueryClient } from "react-query";
import { useMatch, useParams, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";

import { Student } from "../../../@type/Blog";
import { addStudent } from "../../../apis/students.api";
import { isAxiosError } from "../../../utils/utils";
import { getStudent } from "../../../apis/students.api";
import { updateStudent } from "../../../apis/students.api";

type FormStateType = Omit<Student, "id"> | Student;

type FormError =
  | {
      [key in keyof FormStateType]: string;
    }
  | null; // formError là 1 object có các thuộc tính là FormState có kiểu dữ liệu là string hoặc null
const gender = {
  male: "Male",
  female: "Female",
  other: "Other",
};

export default function AddStudent() {
  const initialState: FormStateType = {
    avatar: "",
    email: "",
    btc_address: "",
    country: "",
    first_name: "",
    last_name: "",
    gender: "other",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const addMatch = useMatch("/students/add");
  const isAddMode = Boolean(addMatch);
  const [formState, setFormState] = useState<FormStateType>(initialState);

  const { mutate, error, data, reset, mutateAsync } = useMutation({
    mutationFn: (body: FormStateType) => addStudent(body),
  });

  const studentQuery = useQuery({
    queryKey: ["student", id], // student là 1 định danh thôi
    queryFn: () => getStudent(id as number | string),
    enabled: id !== undefined, // khi id khác thì mới gọi
    staleTime: 10 * 1000, /// kiểm tra đã quá 1os hay chưa, nếu quá r thì mới gọi lại queryFn
  });

  const mutation = useMutation({
    mutationFn: (_) =>
      updateStudent(id as string | number, formState as Student),
    onSuccess: (data) => {
      // cập nhật lại dữ liệu khi edit
      queryClient.setQueryData(["student", id], data);
      navigate("/students");
    },
  });

  const errorForm = useMemo(() => {
    if (
      isAxiosError<{ error: FormError }>(error) &&
      error.response?.status === 422
    ) {
      return error.response.data.error;
    }

    return null;
  }, [error]);

  // dùng currying
  const handleChange =
    (name: keyof FormStateType) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [name]: e.target.value }));
      if (data || error) {
        // khi nhập lại input thì báo lỗi sẽ bị mất đi
        reset();
      }
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isAddMode) {
      mutate(formState, {
        // cách 1 dùng để reset
        onSuccess: () => {
          setFormState(initialState);
          toast.success("addStudent successfully");
        },
        // cách 2 dùng mutationAsyc dùng sync await để đưa về đồng bộ
      });
    } else {
      // phải để undefined thì mới sử dụng đc onSuccess
      mutation.mutate(undefined, {
        onSuccess: () => {
          toast.success("update successfully");
          setFormState(initialState);
        },
      });
    }
  };

  useEffect(() => {
    if (studentQuery.data) {
      setFormState(studentQuery.data.data);
    }
  }, [studentQuery.data]);

  return (
    <div>
      <h1 className="text-lg">{isAddMode ? "Add" : "Edit"} Student</h1>

      <form className="mt-6" onSubmit={handleSubmit}>
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="text"
            name="floating_email"
            id="floating_email"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
            required
            value={formState.email}
            onChange={handleChange("email")}
          />
          <label
            htmlFor="floating_email"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Email address
          </label>
          {errorForm && <p>{errorForm.email}</p>}
        </div>

        <div className="group relative z-0 mb-6 w-full">
          <div>
            <div>
              <div className="mb-4 flex items-center">
                <input
                  id="gender-1"
                  type="radio"
                  name="gender"
                  value={gender.male}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  checked={formState.gender === gender.male}
                  onChange={handleChange("gender")}
                />
                <label
                  htmlFor="gender-1"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Male
                </label>
              </div>
              <div className="mb-4 flex items-center">
                <input
                  id="gender-2"
                  type="radio"
                  name="gender"
                  value={gender.female}
                  checked={formState.gender === gender.female}
                  onChange={handleChange("gender")}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor="gender-2"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Female
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="gender-3"
                  type="radio"
                  name="gender"
                  value={gender.other}
                  checked={formState.gender === gender.other}
                  onChange={handleChange("gender")}
                  className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label
                  htmlFor="gender-3"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Other
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="group relative z-0 mb-6 w-full">
          <input
            type="text"
            name="country"
            id="country"
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
            placeholder=" "
            required
            value={formState.country}
            onChange={handleChange("country")}
          />
          <label
            htmlFor="country"
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >
            Country
          </label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="group relative z-0 mb-6 w-full">
            <input
              name="first_name"
              id="first_name"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              value={formState.first_name}
              onChange={handleChange("first_name")}
            />
            <label
              htmlFor="first_name"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              First Name
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="text"
              name="last_name"
              id="last_name"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
              value={formState.last_name}
              onChange={handleChange("last_name")}
            />
            <label
              htmlFor="last_name"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              Last Name
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="text"
              name="avatar"
              id="avatar"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
              value={formState.avatar}
              onChange={handleChange("avatar")}
            />
            <label
              htmlFor="avatar"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              Avatar Base64
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="text"
              name="btc_address"
              id="btc_address"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
              value={formState.btc_address}
              onChange={handleChange("btc_address")}
            />
            <label
              htmlFor="btc_address"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >
              BTC Address
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
