import React from 'react'

export const Item = () => {
  return (
    <div>Item</div>
  )
}

// import { Post } from '../../@type/Blog'
// interface ItemType{
//   post:Post,
//   startEditingPost:(id:string)=>void
//   deletePost:(id:string)=>void
// }
// export const Item = (props:ItemType) => {
//   const {post, startEditingPost, deletePost} = props
//   return (
//     <div>
//     <img src={post.featureImage} alt="hello ae" />
//     <h2>{post.title}</h2>
//     <h2>{post.description}</h2>
//     <button onClick={()=>startEditingPost(post.id)}>Edit</button>
//     <button onClick={()=>deletePost(post.id)}>Delete</button>
//   </div>
//   )
// }
