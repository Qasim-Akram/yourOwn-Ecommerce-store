import axios from 'axios';
import { useEffect, useState } from 'react';
import './Homepage.css'
import { Header } from '../../components/Header';
import { ProductGrid } from './ProductGrid';
import { useSearchParams } from 'react-router';

export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);
    const [loading,setLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const search = searchParams.get('search');

    useEffect(() => {
        const getHomeData = async () => {
            setLoading(true);
            const url = search ? `/api/products?search=${search}` : '/api/products';
            const response = await axios.get(url);
            setProducts(response.data);
            setLoading(false);
        }
        getHomeData();
    }, [search]);

    return (
        <>
            <Header cart={cart} />

            <div className="home-page">
                {products.length === 0 && search ? (
                    <div className="no-results">
                        <h2>No results found for "{search}"</h2>
                        <p>Try searching with different keywords.</p>
                    </div>
                ) : (loading ? (
                    <div className="loading">Loading results...Please wait!</div>
                ) : (
                    <ProductGrid products={products} loadCart={loadCart} />
                ))}
            </div>
        </>
    );
}