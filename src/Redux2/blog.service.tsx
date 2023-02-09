import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../@type/Blog";

export const blogApi = createApi({
  reducerPath: "blogApi", // tên field trong redux state
  tagTypes: ["Posts"], //  những kiều tag cho phép dùng trong blogApi
  keepUnusedDataFor:10,
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/" , prepareHeaders(headers){
    headers.set('authorization','Bearer ABC')
    return headers
  }}),
  endpoints: (build) => ({
    // Generic type theo thứ tự Api response trả về và argument
    getPosts: build.query<Post[], void>({
      query: () => "posts", // method không có argument
      // providesTags có thể là 1 array hoặc callback return arrayd
      // nếu có bất kì một invalidatesTag nào match với providesTags này
      // thì sẽ làm cho getPost method chạy lại
      // và cập nhật lại danh sách các bài post cũng như các tags phía dưới
      providesTags(result) {
        /* 
                cái callback này sẽ chạy mỗi khi getPosts
                chạy , mong muốn sẽ return về một mảng kiểu 
                 interface Tags:{
                    type:'Posts',
                    id:string
                 }[]
                 vì thế phải as const vào để báo hiệu type là Read only ,không thể mutate
                */
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: "Posts" as const, id })),
            { type: "Posts" as const, id: "LIST" },
          ];
          return final;
        }
        const final = [{ type: "Posts" as const, id: "LIST" }];
        return final;
      },
    }),

    // chúng ta dùng mutation đối với các trường hợp post, put , delete
    // post là resonse trả về và Omit< Post,'id'> là body giửi lên
    addPost: build.mutation<Post, Omit<Post, "id">>({
      query(body) {
        return {
          url: "posts",
          method: "POST",
          body: body,
        };
      },
      // invalidatesTags cung cấp các tag để báo hiệu cho những method nào có providesTags
      // match với nó sẽ bị gọi lại
      // trong trường hợp này getPosts sẽ chạy lại
      invalidatesTags: (result, error, body) => [{ type: "Posts", id: "LIST" }],
    }),
    getPost: build.query<Post, string>({
      query: (id) =>({
        url: `posts/${id}`,
        Headers:{
          hello:'i am dương'
        }, 
        params:{
          first_name:'k',
          last_name:'hello'
        }
      })
    
    }),

    updatePost: build.mutation<Post, { id: string; body: Post }>({
      query(data) {
      //  throw Error('hello')
        return {
          url: `posts/${data.id}`,
          method: "PUT",
          body: data.body,
        };
      },
      invalidatesTags: (result, error, data) => [
        { type: "Posts", id: data.id },
      ],
    }),

    deletePost:build.mutation<{},string>({
      query(id) {
        return {
          url:`posts/${id}`,
          method:'DELETE',
        }

      }, 
      // trong trường hợp này làm cho getPosts chạy lại
      invalidatesTags:(result, error, id)=>[{type:'Posts',id:id}]
    })
  }),
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation
} = blogApi;
