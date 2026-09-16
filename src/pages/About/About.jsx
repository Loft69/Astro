import React from "react";

export default function About() {
    return <div className="page">
        <div className="container">
            <div className="page-heading"><span className="eyebrow">ABOUT ASTRO</span><h1>О нас</h1></div>
            <section className="about-page">
                <div className="about-page__intro"><h2>ASTRO — это одежда для людей, которые создают свой путь.</h2>
                    <p>Мы создаём вещи, которые легко вписываются в повседневную жизнь и позволяют человеку оставаться
                        собой.</p></div>
                <div className="about-values">
                    <div><span>01</span><h3>Качество</h3><p>Мы выбираем материалы, которые сохраняют внешний вид и
                        комфорт.</p></div>
                    <div><span>02</span><h3>Минимализм</h3><p>Никаких лишних деталей. Только продуманный дизайн.</p>
                    </div>
                    <div><span>03</span><h3>Индивидуальность</h3><p>Одежда ASTRO становится частью индивидуального
                        стиля.</p></div>
                </div>
                <div className="about-story"><span className="eyebrow">OUR STORY</span><h2>От идеи до готовой вещи</h2>
                    <p>Каждая коллекция начинается с исследования современных тенденций, материалов и образа жизни наших
                        клиентов. После этого дизайнеры создают первые эскизы, подбираются материалы и разрабатываются
                        прототипы.</p></div>
            </section>
        </div>
    </div>;
}