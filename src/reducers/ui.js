const defaultState = {
  toastProperty: {
    isToastVisible: false,
    type: '',
    message: ''
  },
};
const ui = (state = defaultState, action) => {
  switch (action.type) {
    case 'RESET_UI_REDUCER':
      return {
        ...defaultState
      };
    case 'SHOW_TOAST':
      return {
        ...state,
        toastProperty: {
          isToastVisible: true,
          type: action.payload.type,
          message: action.payload.message
        }
      };
    case 'HIDE_TOAST':
      return {
        ...state,
        toastProperty: {
          isToastVisible: false,
          type: action.payload.type,
          message: action.payload.message
        }
      };

    default:
      return state;
  }
};
export default ui;
