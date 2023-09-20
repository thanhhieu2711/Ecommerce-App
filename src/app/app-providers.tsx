'use client';
import React, { PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/stores';
import Toast from '@/components/Common/Toast';
import 'react-quill/dist/quill.snow.css';
import DefaultLayout from '@/layouts/DefaultLayout';
import LoginModal from '@/containers/Auth/LoginModal';
import RegisterModal from '@/containers/Auth/RegisterModal';
import { SessionProvider } from 'next-auth/react';
import Drawer from '@/components/Common/Drawer';

type Props = {};

const AppProviders = ({ children }: PropsWithChildren<Props>) => {
    return (
        <SessionProvider>
            <ReduxProvider store={store}>
                <DefaultLayout>{children}</DefaultLayout>
                <RegisterModal />
                <LoginModal />

                <Toast />
            </ReduxProvider>
        </SessionProvider>
    );
};

export default AppProviders;
