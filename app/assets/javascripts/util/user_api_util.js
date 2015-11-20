(function (root) {

  var UserApiUtil = root.UserApiUtil = {

    createUser: function (credentials, success, error) {
    $.ajax({
      url: '/api/users',
      type: 'POST',
      dataType: 'json',
      data: credentials,
      error: function (response) {
        error && error(response.responseText);
      },
      success: function (currentUser) {
        CurrentUserActions.receiveUser(currentUser);
        success && success();
        }
      });
    }
  };
})(this);
