(function (root) {

  var ApiUtil = root.ApiUtil = {
    fetchUser: function (user) {
      $.get('users/holder', function(user){
        ApiActions.receiveUser(user);
      },
      'json');
    }
  };
})(this);
