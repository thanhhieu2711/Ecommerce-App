import React from 'react';
import { BiSearch } from 'react-icons/bi';
import Input from 'antd/es/input/Input';
type Props = {};

const HomeSeachBox = (props: Props) => {
    return (
        <div className="sm:w-[320px] relative">
            <Input
                suffix={<BiSearch className="icon-base ml-px " />}
                placeholder="Nhập thông tin sản phẩm"
                className="border-none ring-0 bg-neutral-100 text-sm "
                styles={{
                    input: {
                        backgroundColor: '#F5F5F5',
                    },
                }}
                size="large"
            />
        </div>
    );
};

export default HomeSeachBox;
