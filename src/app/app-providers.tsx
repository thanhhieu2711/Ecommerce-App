'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/stores';
import Toast from '@/components/Common/Toast';
import 'react-quill/dist/quill.snow.css';
import DefaultLayout from '@/layouts/DefaultLayout';
import LoginModal from '@/containers/Auth/LoginModal';
import RegisterModal from '@/containers/Auth/RegisterModal';

type Props = {
    children: React.ReactNode;
};

const AppProviders = ({ children }: Props) => {
    return (
        <Provider store={store}>
            <DefaultLayout>{children}</DefaultLayout>
            <RegisterModal />
            <LoginModal />
            <Toast />
        </Provider>
    );
};

export default AppProviders;
