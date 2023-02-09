// import { AnyAction, isRejectedWithValue, Middleware,MiddlewareAPI } from "@reduxjs/toolkit";

// function isPayloadErrorMessage(payload:unknown):payload is{
//     data:{
//         error:string
//     }
//     status: number
// }{
//     return (
//         typeof payload==='object' && payload !== null && 'data' in payload && typeof(payload as any).data?.error !== 'string'
//     )
// }
// export const rtkQueryErrorLogger:Middleware=(api:MiddlewareAPI)=>next=>(action:AnyAction)=>{
//     /* 
//     isRejectedWithValue là 1 function giúp chúng ta kiểm tra những action có RejectedWithValue= true từ createAsyncThunk
//     Rtk Query sử dụng createAsyncThunk bên trong nên chúng ta có thể dùng isRejectedWithValue để kiểm tra lỗi

//     */

    
//    console.log(action);
   
//    if(isRejectedWithValue())
//     return next(action)
// }

import React from 'react'

export const Middleware = () => {
  return (
    <div>Middleware</div>
  )
}
