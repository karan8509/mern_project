import axios from "axios";
import React, { useState } from "react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClicked = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login",{ email , password } ,  ) ; // 
      console.log("res -->",  res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return ( 
    <div>
      <h1>login</h1>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleClicked}>send</button>
    </div>
  );
};
