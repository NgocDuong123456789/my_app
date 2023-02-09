// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
// interface ErrorFormObject {
//   [key: string | number]: string | EntityError | EntityError[];
// }
// interface EntityError {
//   status: 422;
//   data: {
//     error: ErrorFormObject;
//   };
// }
// /*
// phương pháp type predicate dùng để thu hẹp kiểu của 1 biến
// -- đầu tiên chúng ta sẽ khai báo 1 func check kiểm tra cấu trúc về mặt logic javascript
// -- tiếp theo chúng ta thêm parameterName is Type làm kiểu return của func thay vì boolean
// -- khi dùng func kiểm tra kiểu này , ngoài việc kiểm tra về mặt logic cấu trúc , nó còn chuyển kiểu
// -- so sánh với phương pháp ép kiểu 'type Assertions' thì ép kiểu chúng giúp chúng ta đúc về mặc Type
//  */

// /*  thu hẹp 1 error có kiểu không xác định về FetchBaseQueryError */
// export function isFetchBaseQueryError(
//   error: unknown
// ): error is FetchBaseQueryError {
//   // trả về như này mới là kiểu FetchBaseQueryError
//   return typeof error === "object" && error !== null && "status" in error;
// }

// /*
// thu hẹp một error có kiểu không xác định về mộ object với thuộc tính message:string
// (SerializeError)
//  */

// export function isErroWithMessage(
//   error: unknown
// ): error is { message: string } {
//   return (
//     typeof error === "object" &&
//     error !== null &&
//     "message" in error &&
//     typeof (error as any).message === "string"
//   );
// }

// /*
// thu hẹp 1 error có kiểu không xác định về lỗi liên quan tới post,put không field(EntityError)
//  */

// export function isEntityError(error: unknown): error is EntityError {
//   return (
//     isFetchBaseQueryError(error) &&
//     error.status === 422 &&
//     typeof error.data === "object" &&
//     error.data !== null &&
//     error.data instanceof Array
//   );
// }

import React from 'react'

export const helpers = () => {
  return (
    <div>helpers</div>
  )
}
