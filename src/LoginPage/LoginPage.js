import axios from "axios"
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Main, ButtonText, SignUp } from "../styledLoginSignUp"
import logo from "../img/logo.png"
import { ThreeDots } from 'react-loader-spinner'
import { LoginContext } from "../auth"



export default function LoginPage() {
    const [disabled, setDisabled] = useState(false)
    const [notDisabled, setNotDisabled] = useState(true)
    const { user, setUser } = useContext(LoginContext)
    const [form, setForm] = useState({ email: "", password: "" })
    const navigate = useNavigate()
    const config =  { headers: { "Authorization": `Bearer ${user.token}` } }
    function login(e) {
        e.preventDefault()
        setDisabled(true)
        setNotDisabled(false)
        axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", form)
            .then(res=> setUser(res.data), setDisabled(false), setNotDisabled(true))
            .catch(err => alert(err.response.status), setDisabled(true), setNotDisabled(false))
        axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
        .then(navigate("/habitos"))
    }

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

 
    return (
        <Main disabled={disabled}>
            <img src={logo} />
            <form onSubmit={login}>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    placeholder="email"
                    onChange={handleChange}
                    disabled={disabled}
                    required />
                <input
                    type="password"
                    placeholder="senha"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    disabled={disabled}
                    required />
                    <button disabled={disabled} type="submit">
                    <ButtonText visible={notDisabled}>Entrar</ButtonText>
                    <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#4fa94d"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={disabled}
                    />
                    </button>
            </form>
            <Link to="/cadastro">
                <SignUp>Não tem uma conta? Cadastre-se</SignUp>
            </Link>
        </Main>
    )
}

