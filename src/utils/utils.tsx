import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { AxiosError } from "axios";


export const useQueryString = () => {
  const [searchParams, setSearchParams] = useSearchParams();
// searchParams là 1 object array
  const searchParamsObject = Object.fromEntries([...searchParams]); // array lồng array sang object có key-value
  return searchParamsObject;
};

// dùng cú pháp type predcate typescript để ép về 1 kiểu mình mong muốn
export function isAxiosError<T>(error: unknown):error is AxiosError<T> {
  return axios.isAxiosError(error);
}
