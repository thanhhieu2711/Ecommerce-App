import React from 'react';
import Drawer from '../Common/Drawer';
import useDrawer from '@/hooks/store/useDrawer';
import { useAppDispatch } from '@/stores';
import { openCartDrawer } from '@/stores/reducers/drawer';
import { BiShoppingBag } from 'react-icons/bi';
import { Button } from '../Common';
type Props = {};

const CartDrawer = (props: Props) => {
    const { isOpenCartDrawer } = useDrawer();
    const dispatch = useAppDispatch();
    return (
        <Drawer
            isOpen={isOpenCartDrawer}
            onClose={() => dispatch(openCartDrawer(false))}
            header={
                <div className="flex flex-row items-center gap-2">
                    <BiShoppingBag className="icon-base" />
                    <div>
                        <span className="font-bold text-xl">
                            Giỏ hàng của bạn
                        </span>
                        <span className="text-md text-black/50"> (6)</span>
                    </div>
                </div>
            }
        >
            <div className="h-full w-full flex flex-col">
                <Button
                    className="border-black/30 hover:bg-black transition-all duration-300 ease-out hover:text-white mt-auto"
                    size="sm"
                    theme="white"
                    variant="outline"
                    onClick={() => {}}
                >
                    <p className="text-md font-medium">Thanh toán</p>
                </Button>
            </div>
        </Drawer>
    );
};

export default CartDrawer;
