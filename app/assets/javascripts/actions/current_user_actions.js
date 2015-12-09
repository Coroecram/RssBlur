window.CurrentUserActions = {
  receiveUser: function (user) {
    AppDispatcher.dispatch({
      actionType: CurrentUserConstants.USER_FETCHED,
      user: user
    });
  },

  resetUser: function () {
    AppDispatcher.dispatch({
      actionType: CurrentUserConstants.USER_SIGN_OUT,
    });
  },

  updateUser: function (user) {
    debugger
    AppDispatcher.dispatch({
      actionType: CurrentUserConstants.USER_UPDATED,
      user: user
    });
  }
};
