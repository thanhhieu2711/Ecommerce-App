import { combineReducers } from '@reduxjs/toolkit';
import sample from './sample';
import user from './user';
import authModal from './authModal';
import drawer from './drawer';
const RootReducer = combineReducers({
    sample,
    user,
    authModal,
    drawer,
});

export default RootReducer;
