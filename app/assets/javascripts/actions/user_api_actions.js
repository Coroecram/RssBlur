window.UserApiActions = {
  receiveUser: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_FETCHED,
      user: user
    });
  }
};
