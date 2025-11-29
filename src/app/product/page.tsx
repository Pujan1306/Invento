"use client";
import NavBar from "@/components/dashboard/navbar";
import ProductsView from "@/components/dashboard/products/productView";
import { Product } from "@/types/api-response";
import { useEffect, useState } from "react";

export default function ProductPage() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("/api/inventoryData");
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        };
        fetchProducts();
    }, []);
    return (
        <div>
            <NavBar />
            <ProductsView products={products} />
        </div>
    );
}