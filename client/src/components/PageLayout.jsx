import React from 'react';
import Navigation from '../components/Navigation';

const PageLayout = ({ children, fullWidth = false }) => {
    return (
        <div className="min-h-screen bg-[#050505]">
            <Navigation />
            <main className={`${fullWidth ? '' : ''}`}>
                {children}
            </main>
        </div>
    );
};

export default PageLayout;
