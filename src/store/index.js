import { createStore } from "redux"
import { v4 as uuidV4 } from "uuid"

/*
    timers: [
        id:           ID
        title:        String
        currentTimer: Integer
        lastTimer:    Integer
        running:      Boolean
        menu:         Boolean
        edit:         Boolean
    ]
*/

const initialState = {
    timers: []
}

const generateDefaultTimerProps = () => ({
    id:      uuidV4(),
    running: false,
    menu:    false,
    edit:    false
})

const timerUICreate = (state, action) => {
    return {
        ...state,
        timers: [
            ...state.timers, 
            {
                id:           uuidV4(),
                running:      false,
                menu:         false,
                edit:         true,
                title:        "",
                currentTimer: null,
                lastTimer:    null
            }
        ]
    }
}

const timerUIToggleMenu = (state, action) => {
    const { id } = action.payload
    return {
        ...state,
        timers: state.timers.map(
            timer => (timer.id === id) 
                ? { ...timer, menu: !timer.menu }
                : timer
        )
    }
}

const timerUIToggleEdit = (state, action) => {
    const { id } = action.payload
    return {
        ...state,
        timers: state.timers.map(
            timer => (timer.id === id) 
                ? { ...timer, edit: !timer.edit }
                : timer
        )
    }
}

const createTimer = (state, action) => {
    const { title, timer } = action.payload
    return {
        ...state,
        timers: [
            ...state.timers, 
            {
                title:        title,
                currentTimer: timer,
                lastTimer:    timer,
                ...generateDefaultTimerProps()
            }
        ]
    }
}

const updateTimer = (state, action) => {
    const { id, title, currentTimer, lastTimer } = action.payload
    return {
        ...state,
        timers: state.timers.map(
            timer => (timer.id === id) 
                ? { ...timer, title, currentTimer, lastTimer }
                : timer
        )
    }
}

const deleteTimer = (state, action) => {
    const { id } = action.payload
    return {
        ...state,
        timers: state.timers.filter(timer => timer.id !== id)
    }
}

const clearTimers = (state, action) => {
    return {
        ...state,
        timers: []
    }
}

const startTimer = (state, action) => {
    const { id } = action.payload
    return {
        ...state,
        timers: state.timers.map(
            timer => (timer.id === id) 
                ? { ...timer, running: true }
                : timer
        )
    }
}

const stopTimer = (state, action) => {
    const { id } = action.payload
    return {
        ...state,
        timers: state.timers.map(
            timer => (timer.id === id) 
                ? { ...timer, running: false }
                : timer
        )
    }
}

const toggleTimer = (state, action) => {
    const { id } = action.payload
    return {
        ...state,
        timers: state.timers.map(
            timer => (timer.id === id) 
                ? { ...timer, running: !timer.running }
                : timer
        )
    }
}

const countdown = (state, action) => {
    return {
        ...state,
        timers: state.timers.map(
            timer => ({
                ...timer, 
                currentTimer: timer.currentTimer > 0 && timer.running
                    ? timer.currentTimer - 1
                    : timer.currentTimer
            })
        )
    }
}

const restartTimer = (state, action) => {
    const { id } = action.payload
    return {
        ...state,
        timers: state.timers.map(
            timer => (timer.id === id) 
                ? { ...timer, currentTimer: timer.lastTimer, running: true }
                : timer
        )
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "TIMER_UI_CREATE":
            return timerUICreate(state, action)
        case "TIMER_UI_TOGGLE_MENU":
            return timerUIToggleMenu(state, action)
        case "TIMER_UI_TOGGLE_EDIT":
            return timerUIToggleEdit(state, action)
        case "TIMER_CREATE":
            return createTimer(state, action)
        case "TIMER_UPDATE":
            return updateTimer(state, action)
        case "TIMER_DELETE":
            return deleteTimer(state, action)
        case "TIMER_CLEAR":
            return clearTimers(state, action)
        case "TIMER_TOGGLE":
            return toggleTimer(state, action)
        case "TIMER_START":
            return startTimer(state, action)
        case "TIMER_STOP":
            return stopTimer(state, action)
        case "TIMER_COUNTDOWN":
            return countdown(state, action)
        case "TIMER_RESTART":
            return restartTimer(state, action)
        default:
            return state
    }
}

export const makeStore = (preloadedState = initialState) =>
    createStore(reducer, preloadedState)