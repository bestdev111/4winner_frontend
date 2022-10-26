import axios from 'axios';

export const GET_COURSE = '[ACADEMY APP] GET COURSE';
export const SAVE_COURSE = '[ACADEMY APP] SAVE COURSE';
export const UPDATE_COURSE = '[ACADEMY APP] UPDATE COURSE';

export function getCourse(params) {
    const request = axios.get('/api/academy-app/course', { params });

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type: GET_COURSE,
                payload: response.data
            })
        );
}