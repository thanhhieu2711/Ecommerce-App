import cn from 'classnames';
import Drawer from '../Common/Drawer';
import useDrawer from '@/hooks/store/useDrawer';
import { useAppDispatch } from '@/stores';
import { openWishlistDrawer } from '@/stores/reducers/drawer';
import { BiHeart, BiTrash } from 'react-icons/bi';
import { useWishlist } from '@/hooks/store';
import WishlistItem from './WishlistItem';
import { Button } from '../Common';
import { clearWishlist } from '@/stores/reducers/wishlist';
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
                {!!wishList.length && (
                    <Button
                        onClick={() => dispatch(clearWishlist())}
                        variant="ghost"
                        className="!p-0 !bg-white w-fit h-fit ml-auto mb-2 !text-black/50 hover:!text-red-600 flex flex-row items-center gap-1"
                    >
                        <p className="text-sm">Xóa tất cả</p>
                        <BiTrash />
                    </Button>
                )}
                <div className="flex-1 flex flex-col gap-2">
                    {wishList.map((_item, index) => (
                        <div
                            key={_item.id}
                            className={cn(
                                index !== wishList.length - 1 &&
                                    'border-b border-black/5 pb-2'
                            )}
                        >
                            <WishlistItem item={_item} />
                        </div>
                    ))}
                </div>
            </div>
        </Drawer>
    );
};

export default WishlistDrawer;
