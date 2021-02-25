import _ from 'lodash';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const isSigned = (state = { isSigned: null, userId: null }, action) => {

    switch(action.type){
        case "SIGN_IN":
            return { ...state,isSigned: true, userId: action.payload };

        case "SIGN_OUT":
            return { ...state,isSigned: false, userId: null };

        default:
            return state;
    };
};

const streamReducer = (state={}, action) => {
    
    switch (action.type) {

        case "CREATE_STREAM":
            return {...state, [action.payload.id]: action.payload};

        case "GET_STREAMS":
            return {..._.mapKeys(action.payload, 'id')};

        case "GET_STREAM":
            return {...state, [action.payload.id]: action.payload};

        case "EDIT_STREAM":
            return {...state, [action.payload.id]: action.payload }; 
        
        case "DELETE_STREAM":
            return _.omit(state, action.payload);

        default:
            return state;

    };
};

export default combineReducers({
    auth: isSigned,
    form: formReducer,
    streams: streamReducer
});