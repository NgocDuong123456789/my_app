import React, { useState, useDebugValue } from "react";
interface ThemeType {
  color: "light" | "dark";
}
const useTheme=()=>{
  const [theme, setTheme] = useState<ThemeType>({ color: "light" });
  const onChange = (color: "light" | "dark") => {
    setTheme((prev) => ({...prev, color})
    );
  };
  useDebugValue(theme.color, doTask )
  return {
    theme,onChange
  }
}


const doTask=(value:any)=>{
  for(let  i=0; i< 9999;i++){
    return value=== 'light' ? 'theme is light' : 'theme is dark'
  }
}
export const WelCome = () => {
 const {theme ,onChange}= useTheme()
  return (
    <div>
      <Lable theme={theme} onChange={onChange} />
    </div>
  );
};
const Lable = ({
  theme,
  onChange,
}: {
  theme: ThemeType;
  onChange: (color: "light" | "dark") => void;
}) => {
    console.log(theme);
    
  return (
    <div>
      <input
        type="checkbox"
        checked={theme.color === "dark"}
        onChange={(e) => onChange(e.target.checked ? "dark" : "light")}
      />
      USER DARK MODE
    </div>
  );
};
