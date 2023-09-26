import { combineReducers } from '@reduxjs/toolkit';
import sample from './sample';
import user from './user';
import modal from './modal';
import drawer from './drawer';
import wishlist from './wishlist';
import cart from './cart';
const RootReducer = combineReducers({
    sample,
    user,
    modal,
    drawer,
    cart,
    wishlist,
});

export default RootReducer;
