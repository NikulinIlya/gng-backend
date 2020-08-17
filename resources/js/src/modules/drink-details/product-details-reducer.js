export default function (state, action) {
    switch (action.type) {
        case "set":
            return {
                ...state,
                [action.prop]: { ...state[action.prop], value: action.payload }
            };
        case "reinit": return action.payload
    }
}
