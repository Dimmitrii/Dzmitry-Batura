import { createSlice } from "@reduxjs/toolkit";

import { request } from 'graphql-request'

import getQueries from "../utils/getQueries";

const productPageSlice = createSlice({
    name: "productPage",
    initialState: {
        product:{},
        isPending: true,
    },
    reducers: {
        setProduct: ( state, action ) => {
            state.product = action.payload.product;
        },
        setIsPending: ( state, action) => {
            state.isPending = action.payload;
        },
    },
});

export const { setProduct, setIsPending } = productPageSlice.actions;

export const fetchOneProduct = (id) => async (dispatch) =>{
    dispatch( setIsPending( true ) );
    try{
        const data = await request('http://localhost:4000/',getQueries(id, "oneProduct"));

        dispatch( setProduct( data ) );
        
        dispatch( setIsPending( false ) ); 

        return data;
    }
    catch(err){
        throw new Error(err);
    }
}


export default productPageSlice.reducer;