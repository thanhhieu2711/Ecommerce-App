import Image from 'next/image';
import React from 'react';

type Props = {};

const NotFoundProduct = (props: Props) => {
    return (
        <div className="w-full h-full grid place-items-center">
            <Image alt="" src={'/assets/'} />
        </div>
    );
};

export default NotFoundProduct;
