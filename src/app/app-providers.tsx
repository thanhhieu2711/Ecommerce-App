import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/stores';
type Props = {
    children: React.ReactNode;
};

const AppProviders = ({ children }: Props) => {
    return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default AppProviders;
