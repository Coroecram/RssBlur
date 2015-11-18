
(function (root) {

  var ApiUtil = root.ApiUtil = {
    fetchWebsites: function () {
      $.get('api/websites', function(websites){
        ApiActions.receiveAllWebsites(websites);
      });
    },
    createWebsite: function(data){
      $.post('api/websites', { website: data }, function(website) {
        ApiActions.receiveAll([website]);
      });
    },
    fetchUser: function (user) {
      $.get('users/holder', function(user){
        ApiActions.receiveUser(user);
      });
    }
  }
})(this);
