import { useNavigate } from "react-router-dom"

import "./styles.css"
import perfil from "../assets/perfil.png"
import axios from "axios"

export default function Home({dados}){
  console.log(dados)
    return(
      <div className="home">
        <Header image={dados.membership.image} />
        <Greetings name={dados.name} />
        <Benefits perks={dados.membership.perks} />
        <Footer token={dados.token} />
      </div>
    )
}

function Header({image}){
  return(
    <div className="header">
      <img src={image} alt="plano" />
      <img src={perfil} alt="perfil" />
    </div>
  )
}

function Greetings({name}){
  return(
    <div className="greetings">
      Olá, {name}
    </div>
  )
}

function Benefits({perks}){
  return(
    <div className="benefits">
      <form>
          {perks.map((beneficio) => <ListBenefit title={beneficio.title} link={beneficio.link} key={beneficio.title}/>)}
      </form>
    </div>
  )
}

function ListBenefit({title, link}){
  return(
    <button><a href={link}>{title}</a></button>
  )
}

function Footer({token}){
  const navigate = useNavigate()

  function changePlan(){
    navigate("/subscriptions")
    }

  function deletePlan(){
    const url = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions"
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    const promise = axios.delete(url, config)
    promise.then(response => {
      const {data} = response
      navigate("/subscriptions")
    })
    promise.catch(err => alert(err.response.data.message))
  }
  return(
    <div className="footer">
      <button onClick={() => changePlan()} >Mudar Plano</button>
      <button onClick={() => deletePlan()} >Cancelar Plano</button>
    </div>
  )
}