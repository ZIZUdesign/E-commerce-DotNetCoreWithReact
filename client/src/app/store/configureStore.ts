import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { accountSlice } from "../../features/account/accountSlice";
import { basketSlice } from "../../features/basket/basketSlice";
import { catalogSlice } from "../../features/catalog/catalogSlice";

export const store = configureStore({
    reducer: {
        basket: basketSlice.reducer,
        catalog: catalogSlice.reducer,
        account: accountSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/*
NB: To get the current state -> store.getState(); this can be used to get the root state 
NB: To dispatch an action directly from the store -> store.dispatch(); this can be used to write a custom dispatch hook
- Write a code for the RootState using store.getState, this gets the root state of the 
 app 
   export type RootState = ReturnType<typeof store.getState>;
   export type AppDispatch = typeof store.dispatch;

   CUSTOM HOOKS using the above types: RootState and AppDispatch 

   export const useAppDispatch = () => useDispatch<AppDispatch>();
   export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 

*/