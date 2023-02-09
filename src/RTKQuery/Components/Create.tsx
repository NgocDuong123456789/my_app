// import { useState, useEffect, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Post } from "../../@type/Blog";
// import { useAddPostMutation, useGetPostQuery } from "../../Redux2/blog.service";
// import { RooteState } from "../../Store";
// import { cancelEditPost } from "../BlogList.reducer";
// import { useUpdatePostMutation } from "../../Redux2/blog.service";
// import { isEntityError, isFetchBaseQueryError } from "../../utils/helpers";
// import classNames from "classnames";
// // mẹo copy các key của kiểu Omit<Post,'id'>  để làm key cho kiểu FormErrror
// // type FormError = {
// //   [key in keyof  Omit<Post, "id">]: string | null;
// // };
// // hoặc
// type FormError =
//   | {
//       [key in keyof typeof initialState]: string;
//     }
//   | null;
// const initialState: Omit<Post, "id"> = {
//   title: "",
//   description: "",
//   featureImage: "",
//   publicDate: "",
//   published: false,
// };

// export const Create = () => {
//   // addPost return là 1 func
//   // addPostResult return là 1 {}
//   const dispatch = useDispatch();
//   const id = useSelector((state: RooteState) => state.blog.postId);


//   const [addPost, addPostResult] = useAddPostMutation();
//   const [updatePost, updatePostResult] = useUpdatePostMutation();
//   const [formData, setFormData] = useState<Omit<Post, "id"> | Post>(
//     initialState
//   );
//   const { data, refetch } = useGetPostQuery(id, { skip: !id , refetchOnMountOrArgChange:true}); // nếu không có id thì sẽ skip không gọi api

//   const handleSunmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (id) {
//       await updatePost({ body: formData as Post, id }).unwrap();
//     } else {
//       await addPost(formData).unwrap();
//     }

//     setFormData(initialState);
//   };
//   const handleCancel = () => {
//     dispatch(cancelEditPost());
//     setFormData(initialState);
//   };
//   const errorForm: FormError = useMemo(() => {
//     const errorResult = id ? updatePostResult.error : addPostResult.error;
//     // vì errorResult có thể là FetchBaseQueryError | SerializedError | undefined , mỗi kiểu lại có cấu trúc khác nhau
//     // nên chúng ta cần kiểm tra để hiện thị cho đúng

//     if (isEntityError(errorResult)) {
//       return errorResult.data.error as FormError;
//     }
//     return null;
//   }, [id, updatePostResult, addPostResult]);

//   useEffect(() => {
//     if (data) {
//       setFormData(data);
//     }
//   }, [data]);

//   return (
//     <form onSubmit={handleSunmit}>
//       <button onClick={()=>refetch()}>Force Fetch</button>
//       <div className="mb-6">
//         <label
//           htmlFor="title"
//           className="mb-2 block text-sm font-medium text-gray-50"
//         >
//           Title
//         </label>
//         <input
//           type="text"
//           id="title"
//           className="block  w-full rounded-lg border border-gray-300 bg-gray-50"
//           placeholder="Title"
//           required
//           value={formData.title}
//           onChange={(e) =>
//             setFormData((prev) => ({ ...prev, title: e.target.value }))
//           }
//         />
//       </div>

//       <div className="mb-6">
//         <label
//           htmlFor="title"
//           className={`mb-2 block text-sm font-medium text-gray-50`}
//         >
//           Featured Image
//         </label>
//         <input
//           type="text"
//           id="featuredImage"
//           className={`block  w-full rounded-lg border border-gray-300 bg-gray-50 `}
//           placeholder="Url image"
//           required
//           value={formData.featureImage}
//           onChange={(e) =>
//             setFormData((prev) => ({ ...prev, featureImage: e.target.value }))
//           }
//         />
//       </div>
//       <div className="mb-6">
//         <label
//           htmlFor="title"
//           className="mb-2 block text-sm font-medium text-gray-50"
//         >
//           Description
//         </label>
//         <input
//           type="text"
//           id="Description"
//           className="block  w-full rounded-lg border border-gray-300 bg-gray-50"
//           placeholder="Desc"
//           required
//           value={formData.description}
//           onChange={(e) =>
//             setFormData((prev) => ({ ...prev, description: e.target.value }))
//           }
//         />
//       </div>
//       <div className="mb-6">
//         <label
//           htmlFor="title"
//           className={classNames(
//             "mb-2 block text-sm font-medium  dark:text-gray-300",
//             {
//               "text-red-700": Boolean(errorForm?.publicDate),
//               "text-gray-900": !Boolean(errorForm?.publicDate),
//             }
//           )}
//         >
//           Public Date
//         </label>

//         <input
//           type="datetime-local"
//           id="publicDate"
//           className={classNames("block w-56 rounded-lg ", {
//             "border-red-500 bg-red-50 text-red-900 ": Boolean(
//               errorForm?.publicDate
//             ),
//             "focus:ring-bule-500": !Boolean(errorForm?.publicDate),
//           })}
//           placeholder="Url image"
//           required
//           value={formData.publicDate}
//           onChange={(e) =>
//             setFormData((prev) => ({ ...prev, publicDate: e.target.value }))
//           }
//         />
//         {errorForm?.publicDate && (
//           <>
//             <p>lỗi rồi</p>
//           </>
//         )}
//       </div>
//       <div className="mb-6">
//         <label
//           htmlFor="title"
//           className="mb-2 block text-sm font-medium text-gray-50"
//         >
//           Public
//         </label>
//         <input
//           type="checkbox"
//           id="public"
//           className="block  w-full rounded-lg border border-gray-300 bg-gray-50"
//           placeholder="public"
//           checked={formData.published}
//           onChange={(e) =>
//             setFormData((prev) => ({ ...prev, published: e.target.checked }))
//           }
//         />
//       </div>
//       <div className="mb-6">
//         {data ? (
//           <>
//             <button
//               type="submit"
//               className="group relative mb-2 mr-2 inline-flex items-center justify-center"
//             >
//               <span onClick={handleCancel}>Cancel</span>
//             </button>

//             <button
//               type="submit"
//               className="group relative mb-2 mr-2 inline-flex items-center justify-center"
//             >
//               <span>Update Post</span>
//             </button>
//           </>
//         ) : (
//           <button
//             type="submit"
//             className="group relative mb-2 mr-2 inline-flex items-center justify-center"
//           >
//             <span>Public Post</span>
//           </button>
//         )}
//       </div>
//     </form>
//   );
// };
import React from 'react'

export const Create = () => {
  return (
    <div>Create</div>
  )
}


