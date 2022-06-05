import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="content">
                <Sidebar />
                {children}
            </div>
        </div>
    );
}
