import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import "./styles.css"

export default function Subscriptions({dados}){
    return(
        <div className="subscriptions">
            <Title />
            <ListaPlanos dados={dados}/>
        </div>
    )
}

function Title(){
    return(
        <div className="title">Escolha seu Plano</div>
    )
}

function ListaPlanos({dados}){
    console.log(dados)
    const [planos, setPlanos] = useState([])

    useEffect(() => {
        const url = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships"
        const config = {
            headers: {
                "Authorization": `Bearer ${dados.token}`
            }
        }
        const promise = axios.get(url, config)
        promise.then(response => {
            const {data} = response
            setPlanos(data)
        })
        promise.catch(err => alert(err.response.data.message))
    }, [])

    return(
        <div className="options">
            {planos.map(plano => <Plano image={plano.image} preco={plano.price} id={plano.id} key={plano.id} />)}
        </div>
    )
}

function Plano({image, preco, id}){
    const navigate = useNavigate()

    return(
        <div className="plano" onClick={() => navigate(`/subscriptions/${id}`)}>
            <img src={image} alt="imagem do plano" />
            R$ {preco}
        </div>
    )
}