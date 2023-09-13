'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/stores';
import Toast from '@/components/Common/Toast';
import 'react-quill/dist/quill.snow.css';

type Props = {
    children: React.ReactNode;
};

const AppProviders = ({ children }: Props) => {
    return (
        <Provider store={store}>
            {children}
            <Toast />
        </Provider>
    );
};

export default AppProviders;
