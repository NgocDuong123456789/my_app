import React from 'react'

export const MainLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <ul>
            <li><a href="#">Home</a></li>
        </ul>
        <div>{children}</div>
    </div>
  )
}
