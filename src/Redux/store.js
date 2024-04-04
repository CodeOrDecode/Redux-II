import {legacy_createStore} from "redux"
import {combineReducers} from "redux"
import { todoreducer } from "./Todo/todoreducer"
import { extrareducer } from "./Extra/extrareducer"
import { themereducer } from "./Theme/themereducer"



const rootreducer=combineReducers({
    todo:todoreducer,
    extra:extrareducer,
    thememainweb:themereducer
})

export const store = legacy_createStore(rootreducer)