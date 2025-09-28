import { createSlice, createSelector } from "@reduxjs/toolkit"

const initialState = {
    value: 0,
    history: [],
}
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state){
            state.history.push(state.value)
            state.value += 1
        },
        decrement(state){
            state.history.push(state.value)
            state.value -= 1
        },
        incrementByAmount(state, action){
            const amount = Number(action.payload) || 0
            state.history.push(state.value)
            state.value += amount
        },
        reset(state){
            state.history.push(state.value)
            state.value = 0
        },
        clearHistory(state){
            state.history = []
        },
        setValue(state, action){
            state.history.push(state.value)
            state.value = Number(action.payload) || 0
        },
    },
})

export const {increment,decrement, incrementByAmount ,reset, clearHistory, setValue} = counterSlice.actions

export const selectCounterValue = (state) => state.counter.value
export const selectHistory = (state) => state.counter.history

export const selectLatestHistoryEntry = createSelector([selectCounterValue],(history) => {
    return history.length ? history[history.length - 1] : null
})

export default counterSlice.reducer