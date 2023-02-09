// import { Item } from "./Item";
// import { Skeleton } from "../../Redux2/Component/Skeleton/Skeleton";
// import { useGetPostsQuery } from "../../Redux2/blog.service";
// import { useDispatch } from "react-redux";
// import { startEditingPost } from "../BlogList.reducer";
// import { useDeletePostMutation } from "../../Redux2/blog.service";
// export const List = () => {
//   const { data, isFetching } = useGetPostsQuery();
//   // isLoading chỉ dành cho lần fetch đâu tiên
//   // isFetching  chỉ cho mỗi lần fetch nên thường dùng hơn
//   const [deletePosts, detetePostResult] = useDeletePostMutation();
//   const dispatch = useDispatch();
//   const startEdit = (id: string) => {
//     dispatch(startEditingPost(id));
//   };
//   const deletePost = (id: string) => {
//     deletePosts(id);
//   };
//   return (
//     <div>
//       {isFetching && <Skeleton />}
//       {!isFetching &&
//         data?.map((item) => (
//           <Item
//             key={item.id}
//             post={item}
//             startEditingPost={startEdit}
//             deletePost={deletePost}
//           />
//         ))}
//     </div>
//   );
// };


/*

lỗi có thể đến từ addPost hoặc updatePost
vậy chúng ta sẽ dựa vào điều kiện có PostID hoặc không (đang trong chế độ edit hay không)
chúng ta cũng không cần thiết phải tạo 1 state errorForm
vì errorForm phụ thuộc vào addPostResult , updatePostResult và id nên có thể dùng 1 biến để tính toán

*/
import React from 'react'

export const List = () => {
  return (
    <div>List</div>
  )
}
