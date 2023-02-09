// import { getPost } from "../Blog.reducer";
// import { Post } from "../../@type/Blog";
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { RooteState } from "../../Store";
// import { cancelEditingPost } from "../Blog.reducer";
// import { finishEditingPost } from "../Blog.reducer";
// import { useAppDispatch } from "../../Store";
// export const CreatePost = () => {
//   const initialState: Post = {
//     id: "",
//     description: "",
//     featureImage: "",
//     title: "",
//     publicDate: "",
//     published: false,
//   };
//   const dispatch = useAppDispatch();
//   const [formData, setFormData] = useState<Post>(initialState);
//   const dataEditing = useSelector(
//     (state: RooteState) => state.blog.editingPost
//   );

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formDataWithId = { ...formData };
//     if (dataEditing) {
//       dispatch(finishEditingPost({
//         body: formData,
        
//         postID:dataEditing.id
//       }));
//     } else {
//       dispatch(getPost(formDataWithId));
//     }
//     setFormData(initialState);
//   };
//   const handleCancel = () => {
//     dispatch(cancelEditingPost());
//   };
//   useEffect(() => {
//     setFormData(dataEditing || initialState);
//   }, [dataEditing]);
//   return (
//     <form onSubmit={handleSubmit}>
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
//           className="mb-2 block text-sm font-medium text-gray-50"
//         >
//           Public Date
//         </label>
//         <input
//           type="datetime-local"
//           id="publicDate"
//           className="block  w-full rounded-lg border border-gray-300 bg-gray-50"
//           placeholder="Url image"
//           required
//           value={formData.publicDate}
//           onChange={(e) =>
//             setFormData((prev) => ({ ...prev, publicDate: e.target.value }))
//           }
//         />
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
//         {dataEditing ? (
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

export const CreatePost = () => {
  return (
    <div>CreatePost</div>
  )
}

