'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/stores';
import { Toaster } from 'react-hot-toast';
import { toastConfig } from '@/configs/toastConfig';
type Props = {
    children: React.ReactNode;
};

const AppProviders = ({ children }: Props) => {
    return (
        <Provider store={store}>
            {children}
            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                toastOptions={toastConfig}
            />
        </Provider>
    );
};

export default AppProviders;
