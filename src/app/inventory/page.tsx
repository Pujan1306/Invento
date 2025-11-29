"use client"
import ProductTable from "@/components/dashboard/inventory/productTable";
import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "@/components/dashboard/navbar";

export default function InventoryPage() {
    const [data, setData] = useState({
        products: []
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/inventoryData")
                setData(response.data)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        }
        fetchData()
    }, [])
    return (
        <div>
            <NavBar />
            <ProductTable products={data.products} />
        </div>
    )
}