// app/login/page.tsx
'use client'

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { loginUser } from "@/utils/app"

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleLogin = async() => {
        try {
            const { token, user } = await loginUser(email, password);
            login(token, user);
          } catch (error) {
            alert('Login failed');
          }
        };
      
        return (
          <div>
            <h1>Login</h1>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
          </div>
        );

}