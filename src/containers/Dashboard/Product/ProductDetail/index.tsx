import React from 'react';

type Props = {
    productId: String;
};

export const ProductDetail = ({ productId }: Props) => {
    return <div>{productId}</div>;
};
