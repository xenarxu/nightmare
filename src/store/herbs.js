export default {
    namespaced: true,
    state: {
        dialogFormVisible: false,
        chooseId: '',
    },
    mutations: {
        sendId(state, value) {
            state.chooseId = value
        },
        changeVisible(state, value) {
            state.dialogFormVisible = !state.dialogFormVisible
        },
        resetId(state, value) {
            state.chooseId = state.Herbs[0].id
        }
    }
}