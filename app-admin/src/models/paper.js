
export default {
    namespace: 'paper',
    state: {
        surplusScore: 0,
        choiceList: [],
        completionList: [],
        shortList: [],
    },
    subscribe: {},
    effects: {},
    reducers: {
        setState(state, { payload }){
            return { ...state, ...payload }
        }
    },
}