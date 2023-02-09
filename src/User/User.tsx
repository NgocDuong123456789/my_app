import { useState, useEffect } from "react";

interface UserType {
  first_name: string;
  last_name: string;
}

export const User = () => {
  const [users, setUser] = useState<UserType[]>([]);
  useEffect(() => {
    console.log("useEffect");
    fetch("https://reqres.in/api/users?page=2")
      .then((res) => {
        return res.json();
      })
      .then((res: any) => {
        setUser(res.data);
      });
  }, []);

  return (
    <div>
      User
      <ul>
        {users.map((user: any) => {
          return <li key={user.id}>{user.first_name + "" + user.last_name}</li>;
        })}
      </ul>
    </div>
  );
};
