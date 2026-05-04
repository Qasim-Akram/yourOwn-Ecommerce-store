import axios from 'axios';
import { useEffect, useState } from 'react';
import './Homepage.css';
import { Header } from '../../components/Header';
import { ProductGrid } from './ProductGrid';
import { useSearchParams } from 'react-router';

export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const search = searchParams.get('search');

    useEffect(() => {
        const getHomeData = async () => {
            setLoading(true);
            const url = search ? `/api/products?search=${search}` : '/api/products';
            const response = await axios.get(url);
            setProducts(response.data);
            setLoading(false);
        };
        getHomeData();
    }, [search]);

    const scrollToProducts = () => {
        const productsSection = document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Header cart={cart} />
            <div className="home-page">

                {!search && (
                    <section className="hero">
                        <div className="hero-bg">
                            <div className="grid-overlay" />
                            <div className="glow-orb orb-1" />
                            <div className="glow-orb orb-2" />
                            <div className="diagonal-lines" />
                        </div>

                        <div className="hero-content">
                            <span className="hero-eyebrow">WELCOME TO</span>
                            <h1 className="hero-title">
                                YOUR<span className="accent">OWN</span><br />
                                STORE
                            </h1>
                            <p className="hero-sub">
                                Curated drops. No noise. Just fit.
                            </p>
                            <div className="hero-cta-row">
                                <button onClick={scrollToProducts} className="cta-primary">EXPLORE</button>
                                <div className="cta-line" />
                            </div>
                        </div>

                        <div className="hero-marquee-wrap">
                            <div className="marquee-track">
                                {Array(8).fill(null).map((_, i) => (
                                    <span key={i} className="marquee-item">
                                        YOUROWN STORE <span className="marquee-dot">✦</span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="products-section" id="products">
                    {!search && (
                        <div className="section-header">
                            <h2 className="section-title">ALL <span>PRODUCTS</span></h2>
                            <div className="section-line" />
                        </div>
                    )}

                    {products.length === 0 && search ? (
                        <div className="no-results">
                            <span className="no-results-icon">—</span>
                            <h2>No results for <span>"{search}"</span></h2>
                            <p>Try different keywords.</p>
                        </div>
                    ) : loading ? (
                        <div className="loading">
                            <span className="loading-bar" />
                            <p>LOADING PRODUCTS</p>
                        </div>
                    ) : (
                        <ProductGrid products={products} loadCart={loadCart} />
                    )}
                </section>

            </div>
        </>
    );
}