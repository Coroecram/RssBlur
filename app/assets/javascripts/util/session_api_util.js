(function (root) {

  var ApiUtil = root.ApiUtil = {
    fetchUser: function (user) {
      $.get('users/holder', function(user){
        ApiActions.receiveUser(user);
      },
      'json');
    },

    login: function (credentials, success) {
    $.ajax({
      url: '/api/session',
      type: 'POST',
      dataType: 'json',
      data: credentials,
      success: function (currentUser) {
        console.log("logged in!");
        CurrentUserActions.receiveCurrentUser(currentUser);
        success && success();
      }
    });
  }
  };
})(this);
