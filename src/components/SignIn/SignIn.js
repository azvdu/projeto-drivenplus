import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"


import logo from "../assets/driven-logo.png"
import "./styles.css"

export default function SignIn({setDados}){
    return(
        <div className="signIn">
            <div className="imagem">
                <img src={logo} alt="logo" />
            </div>
            <Login setDados={setDados}/>
            <ButtonSignUp />
        </div>
    )
}

function Login({setDados}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function logar(event){
        event.preventDefault();

        const requisicao = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login",{
            email: email,
            password: password
        })
        requisicao.then( requisicao => {
            const {data} = requisicao
            // dados.name = data.name
            // dados.token = data.token 
            // dados.id = data.membership
            setDados(data)

            console.log({data})
            console.log(data.membership)

            data.membership ? navigate("/home") 
            : navigate("/subscriptions")
        })
        requisicao.catch( err => alert(err.requisicao.data.message))

    }
    return(
        <>
            <div className="login">
                <form onSubmit={logar}>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required/>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="senha" required/>

                    <button type="submit">Entrar</button>
                </form>
            </div>
        </>
    )
}

function ButtonSignUp(){
    const navigate = useNavigate()

    return(
        <div className="cadastrar" onClick={() => navigate("/sign-up")} >
            Não possui uma conta? Cadastre-se
        </div>
    )
}