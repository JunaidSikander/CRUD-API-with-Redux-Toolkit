import {configureStore} from "@reduxjs/toolkit";
import postReducer from "redux/slices/postSlice";

export default configureStore({
    reducer: {
        app: postReducer
    }
})