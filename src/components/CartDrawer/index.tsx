import cn from 'classnames';
import Drawer from '../Common/Drawer';
import useDrawer from '@/hooks/store/useDrawer';
import { useAppDispatch } from '@/stores';
import { openCartDrawer } from '@/stores/reducers/drawer';
import { BiShoppingBag } from 'react-icons/bi';
import { Button } from '../Common';
import useCart from '@/hooks/store/useCart';
import Image from 'next/image';
import Counter from '../Common/Counter';
import CartItem from './CartItem';
import { formatCurrency } from '@/utils/helper';
type Props = {};

const CartDrawer = (props: Props) => {
    const dispatch = useAppDispatch();
    const { isOpenCartDrawer } = useDrawer();
    const { listCart, cartTotal } = useCart();

    return (
        <Drawer
            isOpen={isOpenCartDrawer}
            onClose={() => dispatch(openCartDrawer(false))}
            headerClassname="bg-primary text-white"
            closeIconClassname="text-white rounded-full hover:bg-white hover:text-primary "
            header={
                <div className="flex flex-row items-center gap-2">
                    <BiShoppingBag className="icon-base" />
                    <div>
                        <span className="font-semibold text-lg ">
                            Giỏ hàng của bạn
                        </span>
                    </div>
                </div>
            }
            footer={
                !!listCart.length && (
                    <div className="w-full max-h-[40px] flex flex-row items-center gap-4">
                        <div className="basis-1/3 flex flex-col py-2">
                            <p className="text-sm font-medium text-black/80 ">
                                Tổng tiền
                            </p>
                            <p className="text-lg font-bold text-secondary-variant-2">
                                {formatCurrency(cartTotal)}
                            </p>
                        </div>
                        <Button
                            className="flex-1 border-secondary-variant-2 text-secondary-variant-2 hover:bg-primary transition-all duration-300 ease-out hover:!text-white hover:border-transparent"
                            size="sm"
                            theme="white"
                            variant="outline"
                            onClick={() => {}}
                        >
                            <p className="text-md font-medium">Thanh toán</p>
                        </Button>
                    </div>
                )
            }
        >
            <div className="w-full h-full flex flex-col gap-6">
                <div className="flex-1 flex flex-col gap-2">
                    {listCart.map((cartItem, index) => {
                        return (
                            <div
                                key={index}
                                className={cn(
                                    index !== listCart.length - 1 &&
                                        'border-b border-black/5 pb-2'
                                )}
                            >
                                <CartItem
                                    key={index}
                                    index={index}
                                    item={cartItem}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </Drawer>
    );
};

export default CartDrawer;
