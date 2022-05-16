import { configureStore } from '@reduxjs/toolkit';

import productListReducer from "./productListSlice";
import productPageReducer from "./productPageSlice";
import { cartReducer } from './cartReducer/reducer';

const store = configureStore({
    reducer: {
        productListReducer,
        productPageReducer,
        cartReducer,
    }
});

store.subscribe(() => {
    console.log(store.getState());
});

export default store;