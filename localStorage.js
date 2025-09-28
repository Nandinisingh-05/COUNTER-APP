export const KEY = 'redux_counter_app_state_v1'

export function loadState(){
    try{
        const serialized = localStorage.getItem(KEY)
        if(!serialized) return undefined
        return JSON.parse(serialized)
    } catch (err){
        console.warn('could not load state from localStorag',err)
        return undefined
    }
    
}

export function saveState(state){
    try{
        const serialized = JSON.stringify(state)
        localStorage.setItem(KEY, serialized)
    } catch(err){
        console.warn('could not save state to localStorage',err)
    }
}