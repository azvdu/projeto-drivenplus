import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import "./styles.css"

export default function SignUp(){
    return(
        <div className="signUp">
            <Register />
            <VoltarLogin />
        </div>
    )
}

function Register(){
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function cadastrar(event){
        event.preventDefault()

        const url = "https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up"
        const body = {
            name: name,
            cpf: cpf,
            email: email,
            password: password
        }

        const promise = axios.post(url, body)

        promise.then( response => {
            const {data} = response
            console.log({data})
            navigate("/")
        })
        promise.catch( err => alert(err.response.data.message))
    }

    return(
        <div className="register">
            <form onSubmit={cadastrar}>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="name" required/>
                <input type="numeber" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="CPF" required/>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" required/>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" required/>

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}

function VoltarLogin(){
    const navigate = useNavigate()
    return(
        <div className="voltarLogin" onClick={() => navigate("/")}>Já possui uma conta? Entre</div>
    )
}