import { v4 as uuidv4 } from 'uuid';
import cogoToast from 'cogo-toast';
const { createSlice } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: []
    },
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            const { id, variation, selectedProductColor = null, selectedProductSize = null } = product;
          
            const findMatchingItem = (item) => {
              const isSameId = item.id === id;
              const isSameColor = item.selectedProductColor === selectedProductColor;
              const isSameSize = item.selectedProductSize === selectedProductSize;
          
              if (!variation) {
                return isSameId;
              }
              return isSameId && isSameColor && isSameSize;
            };
          
            const existingItem = state.cartItems.find(findMatchingItem);
          
            if (!existingItem) {
              state.cartItems.push({
                ...product,
                quantity: product.quantity || 1,
                selectedProductColor,
                selectedProductSize,
                cartItemId: uuidv4()
              });
            } else {
              state.cartItems = state.cartItems.map(item =>
                findMatchingItem(item)
                  ? {
                      ...item,
                      quantity: item.quantity + (product.quantity || 1)
                    }
                  : item
              );
            }
          
            cogoToast.success("Added To Cart", { position: "bottom-left" });
          },
          
        // addToCart(state, action) {
        //     const product = action.payload;
        //     console.log("Product", product);
        //     if(!product.variation){
        //         const cartItem = state.cartItems.find(item => item.id === product.id);
        //         if(!cartItem){
        //             state.cartItems.push({
        //                 ...product,
        //                 quantity: product.quantity ? product.quantity : 1,
        //                 cartItemId: uuidv4()
        //             });
        //         } else {
        //             state.cartItems = state.cartItems.map(item => {
        //                 if(item.cartItemId === cartItem.cartItemId){
        //                     return {
        //                         ...item,
        //                         quantity: product.quantity ? item.quantity + product.quantity : item.quantity + 1
        //                     }
        //                 }
        //                 return item;
        //             })
        //         }

        //     } else {
        //         const cartItem = state.cartItems.find(
        //             item =>
        //                 item.id === product.id &&
        //                 product.selectedProductColor &&
        //                 product.selectedProductColor === item.selectedProductColor &&
        //                 product.selectedProductSize &&
        //                 product.selectedProductSize === item.selectedProductSize &&
        //                 (product.cartItemId ? product.cartItemId === item.cartItemId : true)
        //         );
        //         if(!cartItem){
        //             state.cartItems.push({
        //                 ...product,
        //                 quantity: product.quantity ? product.quantity : 1,
        //                 cartItemId: uuidv4()
        //             });
        //         } else if (cartItem !== undefined && (cartItem.selectedProductColor !== product.selectedProductColor || cartItem.selectedProductSize !== product.selectedProductSize)) {
        //             state.cartItems = [
        //                 ...state.cartItems,
        //                 {
        //                     ...product,
        //                     quantity: product.quantity ? product.quantity : 1,
        //                     cartItemId: uuidv4()
        //                 }
        //             ]
        //         } else {
        //             state.cartItems = state.cartItems.map(item => {
        //                 if(item.cartItemId === cartItem.cartItemId){
        //                     return {
        //                         ...item,
        //                         quantity: product.quantity ? item.quantity + product.quantity : item.quantity + 1,
        //                         selectedProductColor: product.selectedProductColor,
        //                         selectedProductSize: product.selectedProductSize
        //                     }
        //                 }
        //                 return item;
        //             });
        //         }
        //     }

        //     cogoToast.success("Added To Cart", {position: "bottom-left"});
        // },
        deleteFromCart(state, action) {
            state.cartItems = state.cartItems.filter(item => item.cartItemId !== action.payload);
            cogoToast.error("Removed From Cart", {position: "bottom-left"});
        },
        decreaseQuantity(state, action){
            const product = action.payload;
            if (product.quantity === 1) {
                state.cartItems = state.cartItems.filter(item => item.cartItemId !== product.cartItemId);
                cogoToast.error("Removed From Cart", {position: "bottom-left"});
            } else {
                state.cartItems = state.cartItems.map(item =>
                    item.cartItemId === product.cartItemId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
                cogoToast.warn("Item Decremented From Cart", {position: "bottom-left"});
            }
        },
        deleteAllFromCart(state){
            state.cartItems = []
        }
    },
});

export const { addToCart, deleteFromCart, decreaseQuantity, deleteAllFromCart } = cartSlice.actions;
export default cartSlice.reducer;
