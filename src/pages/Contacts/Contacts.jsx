import {useState} from "react";
import React from "react";

export default function Contacts() {
    const [sent, setSent] = useState(false);
    return <div className="page">
        <div className="container">
            <div className="page-heading"><span className="eyebrow">ASTRO</span><h1>Контакты</h1></div>
            <div className="contacts">
                <section className="contacts__info">
                    <div><span className="eyebrow">АДРЕС</span><h3>г. Уфа,<br/>ул. Ленина, 10</h3></div>
                    <div><span className="eyebrow">ТЕЛЕФОН</span><h3>+7 (900) 000-00-00</h3></div>
                    <div><span className="eyebrow">EMAIL</span><h3>hello@astro.ru</h3></div>
                </section>
                <div className="map">
                    <div className="map__placeholder"><span>MAP</span><p>Здесь будет карта с расположением магазина</p>
                    </div>
                </div>
            </div>
            <section className="contact-form"><span className="eyebrow">CONTACT US</span><h2>Напишите нам</h2>{sent ?
                <div className="success-message">Сообщение успешно отправлено!</div> : <form onSubmit={e => {
                    e.preventDefault();
                    setSent(true)
                }}>
                    <div className="form-row"><label>Имя<input required/></label><label>Email<input type="email"
                                                                                                    required/></label>
                    </div>
                    <label>Сообщение<textarea rows="6" required/></label>
                    <button className="button button--dark" type="submit">Отправить сообщение</button>
                </form>}</section>
        </div>
    </div>;
}