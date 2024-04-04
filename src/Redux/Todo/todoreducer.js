import { TODODATA } from "./actionitems";

export function todoreducer(state=[],{type,payload}){
    switch(type){
        case TODODATA:{
            return payload
        }
        default:{
            return state
        }
    }

}