import {Link} from "react-router-dom";
import React from "react";

export default function Home() {
    return (
        <div className="home">
            <section className="hero">
                <div className="container hero__content">
                    <p className="eyebrow">ASTRO / NEW COLLECTION</p>
                    <h1>Одежда,<br/>которая отражает тебя.</h1>
                    <p className="hero__description">Современный минимализм, качественные материалы и вещи на каждый
                        день.</p>
                    <Link to="/catalog" className="button button--dark">Смотреть коллекцию</Link>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="section-heading">
                        <div><span className="eyebrow">COLLECTIONS</span><h2>Категории</h2></div>
                    </div>
                    <div className="categories">
                        <Link to="/catalog?category=женское" className="category-card"><span>01</span><h3>Женское</h3>
                        </Link>
                        <Link to="/catalog?category=мужское" className="category-card"><span>02</span><h3>Мужское</h3>
                        </Link>
                        <Link to="/catalog?category=детское" className="category-card"><span>03</span><h3>Детское</h3>
                        </Link>
                        <Link to="/catalog?category=аксессуары" className="category-card"><span>04</span>
                            <h3>Аксессуары</h3></Link>
                    </div>
                </div>
            </section>
            <section className="section section--beige">
                <div className="container about-preview">
                    <div><span className="eyebrow">ABOUT ASTRO</span><h2>Мы создаём одежду вне времени.</h2></div>
                    <div><p>ASTRO — бренд современной одежды, созданный вокруг идеи простоты, качества и
                        индивидуальности.</p><Link to="/about">Узнать больше →</Link></div>
                </div>
            </section>
        </div>
    );
}