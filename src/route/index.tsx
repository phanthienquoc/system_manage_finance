import React from 'react';

import AuthLayout from '../layout/AuthLayout';
import MainLayout from '../layout/MainLayout';
import UserContainer from '../container/UserContainer';
import StockContainer from 'container/StockContainer';
import OrderContainer from 'container/OrderContainer';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DatabaseContainer from 'container/DatabaseContainer';

const AppRoutes = ({ children }: any) => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<div />} />
                    <Route path="signup" element={<div />} />
                    <Route path="forget-password" element={<div />} />
                </Route>
                <Route path="/" element={<MainLayout />}>
                    <Route path="user" element={<UserContainer />} />
                    <Route path="stock" element={<StockContainer />} />
                    <Route path="order" element={<OrderContainer />} />
                    <Route path="database" element={<DatabaseContainer />} />
                </Route>
            </Routes>
        </BrowserRouter >
    )
}

export default AppRoutes;