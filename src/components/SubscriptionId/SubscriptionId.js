import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

import "./styles.css"

export default function SubscriptionId({dados, setDados}){
    const { id } = useParams();
    const [planos, setPlanos] = useState()
    const [popUp, setPopUp] = useState(false)
    const [enviarDados, setEnviarDados] = useState(false)

    useEffect(() => {
        const url = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${id}`
        const config = {
            headers: {
                Authorization: `Bearer ${dados.token}`
            }
        }
        const promise = axios.get(url, config)
        promise.then(response => {
            const {data} = response
            setPlanos(data)
        })
        promise.catch(err => alert(err.response.data.message))
    }, [])
    console.log(planos)
    if(!planos){
        return(<></>)
    }
    return(
        <div className="subscriptionId">
            <ComeBack />
            <Logo image={planos.image} name={planos.name}/>
            <SubscriptionData perks={planos.perks} price={planos.price} />
            <PersonalData token={dados.token} dados={dados} setDados={setDados} setPopUp={setPopUp} enviarDados={enviarDados} />
            <Confirmation name={planos.name} price={planos.price} setPopUp={setPopUp} popUp={popUp} setEnviarDados={setEnviarDados} />
        </div>
    )
}
function ComeBack(){
    const navigate = useNavigate()

    return(
        <div className="icon">
            <ion-icon name="arrow-back-outline" onClick={() => navigate("/subscriptions")} ></ion-icon>
        </div>
    )
}

function Logo({image, name}){
    return (

        <div className="logo">
        <img src={image} alt="logo do plano" />
        {name}
    </div>
    )
}

function SubscriptionData({perks, price}){
    console.log(perks)
    return(
        <div className="subscriptionData">
            <h1><ion-icon name="clipboard-outline"></ion-icon> Beneficios:</h1>
            {perks.map(beneficio => <Beneficio id={beneficio.id} title={beneficio.title} key={beneficio.id} />)}

            <h2><ion-icon name="card-outline"></ion-icon> Preço:</h2>
            R$ {price} cobrados mensalmente
        </div>
    )
}

function Beneficio({id, title}){
    let numero = id
    if(id > 2 && id < 6){
        numero = id - 2
    } else if(id > 5){
        numero = id - 5
    }
    return(
        <div className="beneficios">
            {numero}. {title}  
        </div>
    )
}

function PersonalData({token, dados, setDados, setPopUp, enviarDados}){
    const {id}  = useParams()
    const [nome, setNome] = useState("")
    const [cartao, setCartao] = useState("")
    const [cvv, setCvv] = useState("")
    const [validade, setValidade] = useState("")


    function confirmar(event){
        event.preventDefault()
        setPopUp(true)
    }

    if(enviarDados === true){
        assinar()
    }

    const navigate = useNavigate()

    function assinar(){
        const url = "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions"
        const body = {
            membershipId: id,
            cardName: nome,
            cardNumber: cartao,
            securityNumber: cvv,
            expirationDate: validade
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const promise = axios.post(url, body, config)
        promise.then(response => {
            const {data} = response
            console.log(data)
            setDados({... dados, membership : data.membership})
            navigate("/home")
        })
        promise.catch(err => alert(err.response.data.message))
    }

    return(
        <form onSubmit={confirmar}>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome impresso no cartão" />
            <input type="number" value={cartao} onChange={e => setCartao(e.target.value)} placeholder="Digitos do cartão" />
            <div>
                <input type="number" value={cvv} onChange={e => setCvv(e.target.value)} placeholder="Código de segurança" />
                <input type="number" value={validade} onChange={e => setValidade(e.target.value)} placeholder="Validade" />

            </div>

            <button type="submit">ASSINAR</button>
        </form>
    )
}

function Confirmation({name, price, setPopUp, popUp, setEnviarDados}){
    return(
        <>
            {popUp === true ?
                <div className="confirmation">
                    <div className="popUp">
                        <h1>Tem certeza que deseja assinar o plano {name} ({price})?</h1>
                        <div className="buttons">
                            <button className="nao" onClick={() => setPopUp(false)} >Não</button>
                            <button className="sim" onClick={() => setEnviarDados(true)} >Sim</button>
                        </div>
                    </div>
                </div>
            : <></>}
        </>
    )
}