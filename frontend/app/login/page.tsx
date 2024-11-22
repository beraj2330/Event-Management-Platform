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
            const { token, user} = 
        }
    }

}