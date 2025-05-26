// import cogoToast from 'cogo-toast';
// const { createSlice } = require('@reduxjs/toolkit');
// const wishlistSlice = createSlice({
//     name: "wishlist",
//     initialState: {
//         wishlistItems: []
//     },
//     reducers: {
//         addToWishlist(state, action) {
//             const isInWishlist = state.wishlistItems.findIndex(item => item.id === action.payload.id);
//             if(isInWishlist > -1){
//                 cogoToast.info("Product already in wishlist", {position: "bottom-left"});
//             } else {
//                 state.wishlistItems.push(action.payload);
//                 cogoToast.success("Added To wishlist", {position: "bottom-left"});
//             }
            
//         },
//         deleteFromWishlist(state, action){
//             state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload);
//             cogoToast.error("Removed From Wishlist", {position: "bottom-left"});
//         },
//         deleteAllFromWishlist(state){
//             state.wishlistItems = []
//         }
//     },
// });
// export const { addToWishlist, removeFromWishlist, deleteFromWishlist, deleteAllFromWishlist } = wishlistSlice.actions;
// export default wishlistSlice.reducer;


import cogoToast from 'cogo-toast';
const { createSlice } = require('@reduxjs/toolkit');
const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlistItems: []
    },
    reducers: {
        addToWishlist(state, action) {
            const isInWishlist = state.wishlistItems.findIndex(item => item.id === action.payload.id);
            if(isInWishlist > -1){
                cogoToast.info("Product already in wishlist", {position: "bottom-left"});
            } else {
                state.wishlistItems.push(action.payload);
                cogoToast.success("Added To wishlist", {position: "bottom-left"});
            }
        },
        deleteFromWishlist(state, action){
            state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload);
            cogoToast.error("Remove From Wishlist", {
              position: "bottom-left",
            });
        },
        // deleteAllFromWishlist(state, action){
        //     state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload.id);
        //     cogoToast.error("Removed From Wishlist", {
        //       position: "bottom-left",
        //     });
        // },
        deleteAllFromWishlist(state){
            state.wishlistItems = []
        },
        removeFromWishlist(state, action){
            state.wishlistItems = state.wishlistItems.filter(item => item.id !== action.payload.id);
            cogoToast.error("Removed From Wishlist", {
              position: "bottom-left",
            });
        }
    },
});
export const { addToWishlist, removeFromWishlist, deleteFromWishlist, deleteAllFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;