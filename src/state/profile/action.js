export const Types = {
  GET_PROFILES_REQUEST: 'get_profiles_request',
  GET_PROFILES_SUCCESS: 'get_profiles_success',

  IMAGE_UPLOAD: 'image_upload',
  PROFILES_ERROR: 'profile_error',
};

export const getProfilesRequest = ({ items }) => ({
  type: Types.GET_PROFILES_REQUEST,
  payload: {
    items,
  },
});

export const getProfilesSuccess = ({ items }) => ({
  type: Types.GET_PROFILES_SUCCESS,
  payload: {
    items,
  },
});

export const ProfilesError = ({ error }) => ({
  type: Types.USERS_ERROR,
  payload: {
    error,
  },
});
