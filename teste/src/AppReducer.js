export default (state, action) => {
    console.log(action);
    switch(action.type){
        case "AUTHENTICATE":
            return{
                ...state,
                auth:action.payload.auth,
                role:action.payload.role
            }
        default:
            return state;
    }
}