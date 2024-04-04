import { ERROR, LOADING, MAINTHEME, TODODATA } from "./actionitems";

export function handletodo(value){
    return {type:TODODATA,payload:value}

}


export function handleloading(value){
    return {type:LOADING,payload:value}

}


export function handleerror(value){
    return {type:ERROR,payload:value}

}

export function handletheme(){
    return {type:MAINTHEME}

}