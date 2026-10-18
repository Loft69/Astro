import React, {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";

export default function AuthModal({open, onClose, onSuccess, message}) {
    const {login, register} = useAuth();
    const [tab, setTab] = useState("login");
    const [form, setForm] = useState({
        firstName: "", lastName: "", email: "", password: "",
        birthday: "", preferences: ""
    });
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open) return;
        const onKey = e => e.key === "Escape" && onClose();
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [open, onClose]);

    useEffect(() => {
        if (!open) return;
        setError("");
        setForm({firstName: "", lastName: "", email: "", password: "", birthday: "", preferences: ""});
    }, [open, tab]);

    if (!open) return null;

    const change = e => setForm({...form, [e.target.name]: e.target.value});

    async function submit(e) {
        e.preventDefault();
        setError("");
        try {
            if (tab === "login") await login(form.email, form.password);
            else await register(form);
            onSuccess?.();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="modal-overlay"
             onMouseDown={e => e.target === e.currentTarget && onClose()}>
            <div className="modal" role="dialog" aria-modal="true">
                <button className="modal__close" onClick={onClose} aria-label="Закрыть">×</button>
                <span className="eyebrow">ASTRO ACCOUNT</span>
                <h2>{tab === "login" ? "Вход" : "Регистрация"}</h2>
                <p className="modal__subtitle">
                    {message || "Войдите или создайте аккаунт, чтобы продолжить"}
                </p>

                <div className="modal__tabs">
                    <button type="button"
                            className={tab === "login" ? "active" : ""}
                            onClick={() => setTab("login")}>Вход</button>
                    <button type="button"
                            className={tab === "register" ? "active" : ""}
                            onClick={() => setTab("register")}>Регистрация</button>
                </div>

                <form className="auth-form" onSubmit={submit}>
                    {error && <div className="form-error">{error}</div>}

                    {tab === "register" && (
                        <div className="form-row">
                            <label>Имя
                                <input name="firstName" value={form.firstName} onChange={change} required/>
                            </label>
                            <label>Фамилия
                                <input name="lastName" value={form.lastName} onChange={change} required/>
                            </label>
                        </div>
                    )}

                    <label>Email
                        <input type="email" name="email" value={form.email}
                               onChange={change} required autoComplete="email"/>
                    </label>

                    <label>Пароль
                        <input type="password" name="password" value={form.password}
                               onChange={change} required
                               minLength={tab === "register" ? 6 : undefined}
                               autoComplete={tab === "login" ? "current-password" : "new-password"}/>
                    </label>

                    <button className="button button--dark button--full" type="submit">
                        {tab === "login" ? "Войти" : "Зарегистрироваться"}
                    </button>

                    {tab === "login" && (
                        <button type="button" className="forgot-password"
                                onClick={() => alert("Ссылка для восстановления пароля отправлена на email.")}>
                            Забыли пароль?
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}