import { ERROR, LOADING } from "../Todo/actionitems";

let initialState = {
    loading: false,
    error: false
}

export function extrareducer(state = initialState, { type, payload }) {
    switch (type) {

        case LOADING: {
            return {
                ...state,
                loading: payload,
                error: false
            }
        }

        case ERROR: {
            return {
                ...state,
                loading: false,
                error: payload
            }
        }


        default: {
            return state
        }
    }

}