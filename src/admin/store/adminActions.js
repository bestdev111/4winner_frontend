import { ADMIN_PANEL, GET_ERRORS } from '../../store/actions/actionTypes';
// import AdminService from '../../service/admin.service';
// import ToastService from '../../service/toast.service';
import { AdminPanel } from '../../utils';
export const adminPanel = (role) => {
    return async dispatch => {
        try {
            switch (role) {
                case 'admin':
                    return dispatch({
                        type: ADMIN_PANEL,
                        payload: {
                            adminPanel: AdminPanel.admin,
                        }
                    })
                    break;
                case 'agent':
                    return dispatch({
                        type: ADMIN_PANEL,
                        payload: {
                            adminPanel: AdminPanel.agent,
                        }
                    })
                    break;
                case 'distributor':
                    return dispatch({
                        type: ADMIN_PANEL,
                        payload: {
                            adminPanel: AdminPanel.distributor,
                        }
                    })
                    break;
                case 'cashier':
                    return dispatch({
                        type: ADMIN_PANEL,
                        payload: {
                            adminPanel: AdminPanel.cashier,
                        }
                    })
                    break;
                default:
                    break;
            }
        } catch (error) {
            return dispatch({
                type: GET_ERRORS,
                payload: error.response
            });
        }
    }
};