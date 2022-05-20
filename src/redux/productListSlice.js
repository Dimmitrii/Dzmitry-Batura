import { createSlice } from '@reduxjs/toolkit';

import { request, gql } from 'graphql-request'

import getQueries from '../utils/getQueries';

const productListSlice = createSlice({
    name: "productList",
    initialState:{
        products: [],
        productsCategory: "",
        currencies: [],
        currentCurrency: "$",
        productCategories: [],
    },
    reducers: {
        addProductsCategorires: ( state, action ) => {
            state.productCategories = action.payload;
        },
        addAllProducts: ( state, action ) => {
            state.products = action.payload.category.products;
        },
        changeProductsCategory: ( state, action ) => {
            if( state.productsCategory === action.payload) return;
            state.productsCategory = action.payload;
        },
        addCurrencies: (state, action) => {
            state.currencies = action.payload.currencies;
        },
        selectCurrentCurrency: (state, action) => {
            state.currentCurrency = action.payload;
        }
    },
});

export const { addAllProducts, changeProductsCategory, addCurrencies, selectCurrentCurrency, addProductsCategorires } = productListSlice.actions;

export const fetchAllProducts = (category) => async ( dispatch ) =>{
    try{
        const data  = await request('http://localhost:4000/', getQueries(category));
        
        dispatch( addAllProducts(data) );
    }
    catch(err){
        throw new Error(err);
    }
}

export const fetchCategories = () => async ( dispatch ) =>{
    try{
        const data  = await request('http://localhost:4000/', gql`
        query{
            categories{
                name
            }
        }
        `);
        
        dispatch( addProductsCategorires(data.categories) );
    }
    catch(err){
        throw new Error(err);
    }
}

export const fetchCurrencies = () => async ( dispatch ) =>{
    try{
        const data = await request("http://localhost:4000/",gql`
        query{
            currencies{
                label
                symbol
            }
        }
        `);

        dispatch( addCurrencies(data) );
        
    }
    catch(err){
        throw new Error(err);
    }
}


export default productListSlice.reducer;