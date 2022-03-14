export const initialState = {
    user: null
};

export const actionTypes = {
    setUser: "SET_USER",
    outUser: "OUT_USER"
};


const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case actionTypes.setUser:
            return {
                ...state,
                user: action.user,
            };
            break;
        case actionTypes.outUser:
            return {
                ...state,
                user: null
            };
            break;
        default:
            return state
    }
};

export default reducer