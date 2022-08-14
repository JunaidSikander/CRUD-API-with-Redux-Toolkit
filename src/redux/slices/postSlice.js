import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"

const getPost = createAsyncThunk('/post/getPost', async ({id}) => {
    const response = await fetch(`${SERVER_URL}/${id}`);
    return await response.json();
});

const deletePost = createAsyncThunk('/post/deletePost', async ({id}) => {
    const response = await fetch(`${SERVER_URL}/${id}`, {method: 'DELETE'});
    return await response.json();
});

const createPost = createAsyncThunk('/post/createPost', async ({values: post}) => {
    const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {Accept: "application/json", "Content-type": "application/json"},
        body: JSON.stringify(post)
    });
    return await response.json();
});

const updatePost = createAsyncThunk('/post/updatePost', async ({id, title, body}) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            title,
            body,
        })
    });
    return await response.json();
});

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        post: [],
        loading: false,
        error: null,
        body: "",
        edit: false
    },
    reducers: {
        setEdit: (state, action) => {
            const {edit, body} = action.payload;
            state.edit = edit;
            state.body = body;
        }
    },
    extraReducers: {
        [getPost.pending]: (state, action) => {
            state.loading = true;
        },
        [getPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = [action.payload]
        },
        [getPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [deletePost.pending]: (state, action) => {
            state.loading = true;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = action.payload
        },
        [deletePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [createPost.pending]: (state, action) => {
            state.loading = true;
        },
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = [action.payload]
        },
        [createPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        [updatePost.pending]: (state, action) => {
            state.loading = true;
        },
        [updatePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.post = [action.payload]
        },
        [updatePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
    },
})

export const {setEdit} = postSlice.actions;
export {getPost, deletePost, createPost, updatePost}
export default postSlice.reducer;
