import React, { useState } from 'react';
import SignIn from '../SignIn/SignIn';
import './Dashboard.scss';

export interface DashboardProps {
    products: Product[];
}

const Dashboard: React.FC<DashboardProps> = ({ products }) => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [gotoDashboard, setGotoDashboard] = useState(true);
    const [signIn, setSignIn] = useState(false);

    const displayProducts = products.map(product => {
        return (
            <div className='row product'>
                <div className='col-5 col-sm-4 col-md-3 col-lg-3'>
                    <img src={product.displayImage} height='200' alt='product' />
                </div>
                <div className='col-7 col-sm-8 col-md-9 col-lg-9 product-info'>
                    <div className='product-name'>
                        {product.name}
                    </div>
                    <div className='product-cost'>
                        INR {product.price}.00
                    </div>
                    <div>
                        {product.size || ''}, {product.color || ''}, {product.brand || ''}
                    </div>
                    <div>
                        {product.description}
                    </div>
                </div>
            </div>
        )
    });

    const SignInSuccessful = (): void => {
        setUserLoggedIn(true);
        setSignIn(false);
    }

    return (
        <div>
            <div className='header-containter'>
                <div className='row'>
                    <div className='col-3 col-lg-3 col-md-3 col-sm-3'>
                        <h2 className='app-name'>SHOPPINGMART</h2>
                    </div>
                    <div className='col-9 col-lg-9 col-md-9 col-sm-9 logout-container'>
                        <button
                            className='btn action-button'
                            onClick={() => {
                                setSignIn(false);
                                setGotoDashboard(true);
                            }}
                        >
                            Cart
                        </button>
                        {userLoggedIn ?
                            <button
                                className='btn action-button'
                                onClick={() => setUserLoggedIn(false)}
                            >
                                Logout
                            </button>
                            :
                            <button
                                className='btn action-button'
                                onClick={() => setSignIn(true)}
                            >
                                SignIn/SignUp
                            </button>
                        }
                    </div>
                </div>
            </div>
            {signIn
                ? <SignIn
                    products={products}
                    SignInSuccessful={SignInSuccessful}
                />
                : gotoDashboard
                    ? <div className='main-product'>
                        {displayProducts}
                    </div>
                    : null}
        </div>
    );
};

export default Dashboard;
