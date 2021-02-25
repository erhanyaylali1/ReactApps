import Streams from '../apis/Streams';
import history from '../history';

export const signIn = (userId) => {
    return {
        type: 'SIGN_IN',
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    };
};

export const createStream = (formValues) => {
    return async (dispatch, getState) => {
        const { userId } = getState().auth;
        const response = await Streams.post('/streams', {...formValues, userId});
        dispatch({ type: "CREATE_STREAM", payload: response.data });
        history.push("/");
    };
};

export const getStreams = () => {
    return async (dispatch) => {
        const response = await Streams.get("/streams");
        dispatch({ type: "GET_STREAMS",  payload: response.data });
    };
};

export const getStream = (id) => {
    return async (dispatch) => {
        const response = await Streams.get(`/streams/${id}`);
        dispatch({ type: "GET_STREAM", payload: response.data });
    };
};

export const editStream = (id, formValues) => {
    return async (dispatch) => {
        const response = await Streams.patch(`/streams/${id}`, formValues);
        dispatch({ type: "EDIT_STREAM", payload: response.data });
        history.push("/");
    };
};

export const deleteStream = (id) => {
    return async (dispatch) => {
        await Streams.delete(`/streams/${id}`);
        dispatch({ type: "DELETE_STREAM", payload: id });
    };
};