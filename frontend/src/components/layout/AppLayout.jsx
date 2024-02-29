/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';

const AppLayout = () => (WrapperComponent) => {
    return (props) => {
        return (
            <div>
                <Header />
                <WrapperComponent {...props} />
                <Footer />
            </div>
        )
    }
}

export default AppLayout;
