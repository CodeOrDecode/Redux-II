import { MAINTHEME } from "../Todo/actionitems";


export function themereducer(state={theme:true},action){
    switch(action.type){
        case MAINTHEME:{
            return {theme:!state.theme}
        }
        default:{
            return state
        }
    }

}