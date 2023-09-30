'use client';
import React, { PropsWithChildren } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store, persistor } from '@/stores';
import Toast from '@/components/Common/Toast';
import DefaultLayout from '@/layouts/DefaultLayout';
import { SessionProvider } from 'next-auth/react';
import 'react-quill/dist/quill.snow.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { PersistGate } from 'redux-persist/integration/react';

type Props = {};

const AppProviders = ({ children }: PropsWithChildren<Props>) => {
    return (
        <SessionProvider>
            <ReduxProvider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <DefaultLayout>{children}</DefaultLayout>
                    <Toast />
                </PersistGate>
            </ReduxProvider>
        </SessionProvider>
    );
};

export default AppProviders;
