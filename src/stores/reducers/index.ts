import { combineReducers } from '@reduxjs/toolkit';
import sample from './sample';
import user from './user';
import authModal from './authModal';
const RootReducer = combineReducers({
    sample,
    user,
    authModal,
});

export default RootReducer;
