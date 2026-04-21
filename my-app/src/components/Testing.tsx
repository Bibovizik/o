import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Temp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle your auth logic here
        console.log('Login attempt:', { email, password });
    };

    return (
        <div className="login-page-container px-3">
            <div className="glass-card">

                <div className="text-center mb-4">
                    <h2 className="fw-bold" style={{ letterSpacing: '2px' }}>TOKITO</h2>
                    <p className="text-secondary">Welcome back to the store</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-light opacity-75 small text-uppercase" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="form-control form-control-lg glass-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label text-light opacity-75 small text-uppercase" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control form-control-lg glass-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-info w-100 py-2 fw-bold mb-3"
                        style={{ backgroundColor: '#1a9fff', border: 'none' }}
                    >
                        Sign In
                    </button>
                </form>

                <div className="text-center mt-4">
                    <span className="text-secondary">New to Tokito? </span>
                    <Link to="/register" className="text-info text-decoration-none border-bottom border-info pb-1">
                        Create an account
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Temp;