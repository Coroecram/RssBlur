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
          CurrentUserActions.receiveUser(currentUser);
          success && success();
        }
      });
    },

    fbLogin: function (credentials, success, error) {
      console.log(credentials)
      $.ajax({
        url: '/api/fb_login',
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
    },

    logout: function () {
      $.ajax({
        url: '/api/session',
        type: 'DELETE',
        dataType: 'json',
        success: function () {
          CurrentUserActions.resetUser();
        }
      });
    },

    fetchCurrentUser: function () {
      $.ajax({
        url: '/api/session',
        type: 'GET',
        dataType: 'json',
        success: function (currentUser) {
          CurrentUserActions.receiveUser(currentUser);
        }
      });
    }
  };
})(this);
