export default (state, action) => {
    console.log(action.payload);
    switch(action.type){
        case "AUTHENTICATE":
            return{
                ...state,
                auth:action.payload.auth,
                role:action.payload.role,
                nome:action.payload.nome,
                email:action.payload.email
            }
        case "LOGOUT":
            return{
                ...state,
                auth:false,
                role:'Cliente',
                nome:'',
                email:''
            }
        default:
            return state;
    }
}