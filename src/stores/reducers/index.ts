import { combineReducers } from '@reduxjs/toolkit';
import sample from './sample';
import user from './user';
import authModal from './authModal';
import drawer from './drawer';
import wishlist from './wishlist';
import cart from './cart';
const RootReducer = combineReducers({
    sample,
    user,
    authModal,
    drawer,
    cart,
    wishlist,
});

export default RootReducer;
