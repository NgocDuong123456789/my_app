import {useState} from 'react'
import { Confirm } from './Confirm'
const initialStudents=[
    {
        id:1,
        name:'dương'
    },{
        id:2,
        name:'hoa'
    }
]
export const Manager = () => {
    const [students, setStudents]=useState<typeof initialStudents>(initialStudents)
    const [show, setShow]=useState<boolean>(false)
    const [id, setId]=useState<number>()
    const ok=() => {
        setStudents((prev)=>{
           return  prev.filter(student=>student.id !== id)
        }) 
        setShow(false)
    }
    
    const cancel=()=>{
        setShow(false)
    }
    const handleShow=(id:number)=>{
        setShow(true)
        setId(id)
    }

  return (
    <div>
        <h1>Manager student</h1>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((student, index)=>{
                            return (
                                <tr key={student.id}> 
                                <td>{index+1}</td>
                                <td>{student.name}</td>
                                <td><button onClick={()=>handleShow(student.id)}>Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        <Confirm visible={show}  ok={ok}  cancel={cancel} />
    </div>
  )
}
