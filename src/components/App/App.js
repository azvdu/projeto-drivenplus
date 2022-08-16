import { BrowserRouter, Routes, Route} from "react-router-dom"
import { useState } from "react"

import SignIn from "../SignIn/SignIn"
import SignUp from "../SignUp/SignUp"
import Subscriptions from "../Subscritions/Subscritions"
import SubscriptionId from "../SubscriptionId/SubscriptionId"
import Home from "../Home/Home"

import "./styles.css"
import "./reset.css"

export default function App(){
    const [dados, setDados] = useState("")

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn setDados={setDados}/>} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/subscriptions" element={<Subscriptions dados={dados}/>} />
                <Route path="/subscriptions/:id" element={<SubscriptionId setDados={setDados} dados={dados}/>} />
                <Route path="/home" element={<Home dados={dados}/>} />
            </Routes>
        </BrowserRouter>
    )
}
