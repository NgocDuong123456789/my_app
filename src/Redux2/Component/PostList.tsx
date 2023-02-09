// import { PostItem } from "./PostItem";
// import {  useDispatch , useSelector} from "react-redux";
// import { RooteState } from "../../Store";
// import { deletePost } from "../Blog.reducer";
// import { startEditingPost } from "../Blog.reducer";
// import { useAppDispatch } from "../../Store";
// import {useEffect} from 'react'
// import { addPost } from "../Blog.reducer";
// import { Skeleton } from "./Skeleton/Skeleton";
// export const PostList = () => {
//   const postList = useSelector((state: RooteState) => state.blog.PostList);
//   console.log(postList);
  
//   const Loading = useSelector((state: RooteState) => state.blog.loading)
//   const dispatch = useAppDispatch();
//   const handleDeletePost = (id: string) => {
//     dispatch(deletePost(id));
//   };
// console.log(Loading);
//   const handleStartEditing = (id: string) => {
//     dispatch(startEditingPost(id));
//   };

  
//   useEffect(()=>{
//    const promise=  dispatch(addPost())
//    return ()=>promise.abort()
//   },[dispatch])


//   return (
//     <div>
//        {
//         Loading ? <Skeleton /> :
//         postList.map((post) => (
//         <PostItem 
//           post={post}
//           key={post.id}
//           handleDeletePost={handleDeletePost}
//           handleStartEditing={handleStartEditing}
//         />
//       ))}
//     </div>
//   );
// };

import React from 'react'

export const PostList = () => {
  return (
    <div>PostList</div>
  )
}

