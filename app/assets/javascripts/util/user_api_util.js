(function (root) {

  var UserApiUtil = root.UserApiUtil = {

    createUser: function (credentials, success, error) {
    $.ajax({
      url: '/api/users',
      type: 'POST',
      dataType: 'json',
      data: credentials,
      error: function (response) {
        error && error(response.responseJSON);
      },
      success: function (currentUser) {
        CurrentUserActions.receiveUser(currentUser);
        success && success();
        }
      });
    },

    updateUser: function (attributes, success, error) {
    $.ajax({
      url: '/api/users/current',
      type: 'PATCH',
      processData: false,
      contentType: false,
      dataType: 'json',
      data: attributes,
      error: function (response) {
        error && error(response.responseText);
      },
      success: function (user) {
        success && success();
        CurrentUserActions.updateUser(user);
        }
      });
    },

    createGuest: function (success, error) {
    $.ajax({
      url: '/api/guest_user',
      type: 'POST',
      dataType: 'json',
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
