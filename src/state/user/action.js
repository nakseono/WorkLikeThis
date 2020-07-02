export const Types = {
  GET_USERS_REQUEST: 'get_users_request',
  GET_USERS_SUCCESS: 'get_users_success',
  CREATE_USER_REQUEST: 'create_user_request',
  DELETE_USER_REQUEST: 'delete_user_request',
  USERS_ERROR: 'user_error',
  LOGIN_REQUEST: 'login_request',
  LOGIN_SUCCESS: 'login_success',
};
export const loginSuccess = ({ items }) => ({
  type: Types.LOGIN_SUCCESS,
  payload: {
    items,
  },
});
export const loginRequest = ({ items }) => ({
  type: Types.LOGIN_REQUEST,
  payload: {
    items,
  },
});

export const getUsersRequest = () => ({
  type: Types.GET_USERS_REQUEST,
});

export const getUsersSuccess = ({ items }) => ({
  type: Types.GET_USERS_SUCCESS,
  payload: {
    items,
  },
});

export const createUserRequest = ({ name }) => ({
  type: Types.CREATE_USER_REQUEST,
  payload: {
    name,
  },
});

export const deleteUserRequest = (userId) => ({
  type: Types.DELETE_USER_REQUEST,
  payload: {
    userId,
  },
});

export const usersError = ({ error }) => ({
  type: Types.USERS_ERROR,
  payload: {
    error,
  },
});
