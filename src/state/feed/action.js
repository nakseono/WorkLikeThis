export const Types = {
  GET_FEEDS_REQUEST: 'get_feeds_request',
  GET_FEEDS_SUCCESS: 'get_feeds_success',
  CREATE_FEED_REQUEST: 'create_feed_request',
  DELETE_FEED_REQUEST: 'delete_feed_request',
  IMAGE_UPLOAD: 'image_upload',
  FEEDS_ERROR: 'feed_error',
};

export const getFeedsRequest = ({ items }) => ({
  type: Types.GET_FEEDS_REQUEST,
  payload: {
    items,
  },
});

export const getFeedsSuccess = ({ items }) => ({
  type: Types.GET_FEEDS_SUCCESS,
  payload: {
    items,
  },
});

export const createFeedRequest = (items) => ({
  type: Types.CREATE_FEED_REQUEST,
  payload: {
    items,
  },
});

export const deleteFeedRequest = (userId) => ({
  type: Types.DELETE_FEED_REQUEST,
  payload: {
    userId,
  },
});

export const FeedsError = ({ error }) => ({
  type: Types.USERS_ERROR,
  payload: {
    error,
  },
});
