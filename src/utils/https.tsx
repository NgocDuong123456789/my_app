import axios from "axios";
export const https = axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 10000, // quá thời gian này thì request tự hủy 
    headers: {
      'Content-Type': 'application/json'
    }// giửi lên server để server biết là ta mong muốn nhận và giửi kiểu json
    
  });

  