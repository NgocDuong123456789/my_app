// import { Post } from "../../@type/Blog"
// interface PostItemType{
//   post:Post
//   handleDeletePost: (id:string)=>void 
//   handleStartEditing:(id:string)=>void
// }
// export const PostItem = (props:PostItemType) => {
//   const {post, handleDeletePost, handleStartEditing} = props

//   return (
//     <div>
//     <img src={post.featureImage} alt="hello ae" />
//     <h2>{post.title}</h2>
//     <h2>{post.description}</h2>
//     <button onClick={()=>handleStartEditing(post.id)}>Edit</button>
//     <button onClick={ ()=>handleDeletePost(post.id)}>Delete</button>
//   </div>
//   )
// }

import React from 'react'

export const PostItem = () => {
  return (
    <div>PostItem</div>
  )
}
