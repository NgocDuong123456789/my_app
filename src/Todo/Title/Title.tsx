import {memo, useRef} from 'react'
type Title ={
    address:{
        street:string
    }
    handleClickTitle:(value:any)=>void
}
const Title = (props:Title) => {
  const h1Ref=useRef<HTMLHeadingElement>(null)
    const {address,handleClickTitle} = props
    console.log(handleClickTitle);
  return (
    <div><h1 ref={h1Ref}>Title</h1></div>
  )
}

// const equal=(prevProp:any, nextProps:any)=>{
//    if(prevProp.address.street === nextProps.address.street) return true
//    return false
// }

export default memo(Title)
// useCallback dùng khi chúng ta không muốn
// func được khởi tạo lại mỗi lần component bị re-render 
