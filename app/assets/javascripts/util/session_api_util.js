(function (root) {

  var SessionApiUtil = root.SessionApiUtil = {

    login: function (credentials, success, error) {
    $.ajax({
      url: '/api/session',
      type: 'POST',
      dataType: 'json',
      data: credentials,
      error: function (response) {
        error && error(response.responseText);
      },
      success: function (currentUser) {
        console.log("logged in!");
        CurrentUserActions.receiveUser(currentUser);
        success && success();
      }
    });
  },

  logout: function (  ) {
    $.ajax({
      url: '/api/session',
      type: 'DELETE',
      dataType: 'json',
      success: function () {
        console.log("logged out!");
        CurrentUserActions.resetUser();
      }
    });
  }
  };
})(this);
