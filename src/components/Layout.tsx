import React from 'react';
import { Outlet } from 'react-router-dom';
const Layout: React.FC = () => {

    return (
        <div style={{
            background: "#ffffff"
        }} className="min-h-screen relative overflow-hidden">
            <Outlet />
        </div>
    );
};

export default Layout;
