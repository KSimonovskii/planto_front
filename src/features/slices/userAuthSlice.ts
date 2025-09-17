import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface changeTokenPayload {
    token: string
}

interface changeIsLogged {
    accessTokenLoaded: boolean
}

const userAuthSlice = createSlice({
    name: "userAuthSlice",
    initialState: {
        accessToken: "",
        refreshToken: "",
        accessTokenLoaded: true
    },
    reducers: {
        changeAccessToken: (state, action: PayloadAction<changeTokenPayload>) => {
            state.accessToken = action.payload.token;
            state.accessTokenLoaded = true;
        },
        changeRefreshToken: (state, action: PayloadAction<changeTokenPayload>) => {
            state.refreshToken = action.payload.token;
        },
        changeIsLogged: (state, action: PayloadAction<changeIsLogged>) => {
            state.accessTokenLoaded = action.payload.accessTokenLoaded;
        }
    }
})

export const {
    changeAccessToken,
    changeRefreshToken,
    changeIsLogged
} = userAuthSlice.actions;
export default userAuthSlice.reducer
