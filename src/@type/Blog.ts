export interface Post {
    title:string
    description:string
    publicDate:string,
    id:string
    featureImage:string
    published:boolean
}

export interface Student{
    id:number,
    first_name:string,
    last_name:string
    email:string,
    gender:string,
    country:string,
    avatar:string,
    btc_address:string
}

export type Studentss = Pick<Student,'id'|'email'|'avatar'|'last_name'>[] // chỉ có 4 cái cần chọn thôi