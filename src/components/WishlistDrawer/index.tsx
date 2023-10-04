import cn from 'classnames';
import Drawer from '../Common/Drawer';
import useDrawer from '@/hooks/store/useDrawer';
import { useAppDispatch } from '@/stores';
import { openWishlistDrawer } from '@/stores/reducers/drawer';
import { BiHeart } from 'react-icons/bi';
import { useWishlist } from '@/hooks/store';
import WishlistItem from './WishlistItem';
type Props = {};

const WishlistDrawer = (props: Props) => {
    const { isOpenWishlistDrawer } = useDrawer();
    const dispatch = useAppDispatch();
    const { wishList } = useWishlist();
    return (
        <Drawer
            isOpen={isOpenWishlistDrawer}
            onClose={() => dispatch(openWishlistDrawer(false))}
            header={
                <div className="flex flex-row items-center gap-2">
                    <BiHeart className="icon-base" />
                    <div>
                        <span className="text-lg font-semibold">
                            Sản phẩm yêu thích
                        </span>
                        {/* <span className="text-md text-black/50"> (6)</span> */}
                    </div>
                </div>
            }
        >
            <div className="h-full w-full flex flex-col">
                {wishList.map((_item, index) => (
                    <div
                        key={_item.id}
                        className={cn(
                            index !== wishList.length - 1 &&
                                'border-b border-black/5'
                        )}
                    >
                        <WishlistItem item={_item} />
                    </div>
                ))}
            </div>
        </Drawer>
    );
};

export default WishlistDrawer;
