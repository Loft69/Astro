import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import React from "react";

export default function Login() {
    const navigate = useNavigate();
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function submit(e) {
        e.preventDefault();
        if (!login(email, password)) return setError("Неверный email или пароль");
        navigate("/profile");
    }

    return <div className="auth-page">
        <form className="auth-form" onSubmit={submit}>
            <span className="eyebrow">ASTRO ACCOUNT</span><h1>Вход</h1><p>Войдите в личный кабинет ASTRO.</p>
            {error && <div className="form-error">{error}</div>}
            <label>Email<input type="email" value={email} onChange={e => setEmail(e.target.value)} required/></label>
            <label>Пароль<input type="password" value={password} onChange={e => setPassword(e.target.value)} required/></label>
            <button className="button button--dark button--full" type="submit">Войти</button>
            <button type="button" className="forgot-password"
                    onClick={() => alert("Ссылка для восстановления пароля отправлена на email.")}>Забыли пароль?
            </button>
            <div className="auth-link">Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></div>
        </form>
    </div>;
}