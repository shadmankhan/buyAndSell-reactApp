const showToast = payload => ({
  type: 'SHOW_TOAST',
  payload
});
const hideToast = payload => ({
  type: 'HIDE_TOAST',
  payload
});

export const handleShowToast = payload => dispatch => {
  dispatch(showToast(payload));
};

export const handleHideToast = payload => dispatch => {
  dispatch(hideToast(payload))
}