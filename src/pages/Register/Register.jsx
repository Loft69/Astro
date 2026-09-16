import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import React from "react";

export default function Register() {
    const navigate = useNavigate();
    const {register} = useAuth();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        birthday: "",
        preferences: ""
    });
    const [error, setError] = useState("");

    function change(e) {
        setForm({...form, [e.target.name]: e.target.value});
    }

    function submit(e) {
        e.preventDefault();
        if (!register(form)) return setError("Пользователь с таким email уже существует.");
        navigate("/profile");
    }

    return <div className="auth-page">
        <form className="auth-form auth-form--large" onSubmit={submit}>
            <span className="eyebrow">ASTRO ACCOUNT</span><h1>Регистрация</h1><p>Создайте аккаунт ASTRO.</p>
            {error && <div className="form-error">{error}</div>}
            <div className="form-row">
                <label>Имя<input name="firstName" value={form.firstName} onChange={change} required/></label>
                <label>Фамилия<input name="lastName" value={form.lastName} onChange={change} required/></label>
            </div>
            <label>Email<input type="email" name="email" value={form.email} onChange={change} required/></label>
            <label>Пароль<input type="password" name="password" value={form.password} onChange={change}
                                required/></label>
            <label>Дата рождения<input type="date" name="birthday" value={form.birthday} onChange={change}/></label>
            <label>Предпочтения в одежде<select name="preferences" value={form.preferences} onChange={change}>
                <option value="">Выберите стиль</option>
                <option value="casual">Casual</option>
                <option value="minimal">Минимализм</option>
                <option value="street">Streetwear</option>
                <option value="classic">Классика</option>
            </select></label>
            <button className="button button--dark button--full" type="submit">Зарегистрироваться</button>
            <div className="auth-link">Уже есть аккаунт? <Link to="/login">Войти</Link></div>
        </form>
    </div>;
}