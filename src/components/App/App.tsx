import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import './App.scss';
import Dashboard from '../Dashboard/Dashboard';

export interface AppProps {
}

const App: React.FC<AppProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProductDetails = async (): Promise<Product[]> => {
    const response: AxiosResponse = await axios.get('http://localhost:4000/Product/');
    if (response.status !== 200) {
      throw new Error("Unable to fetch scan page info, please try later!");
    } else {
      return response.data;
    }
  };

  useEffect(() => {
    // Fetching product details
    const fetchProducts = async (): Promise<void> => {
      try {
        const productData = await getProductDetails();
        setProducts(productData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Dashboard products={products} />
    </div>
  )
};

export default App;
