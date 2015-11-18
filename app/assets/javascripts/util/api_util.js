
(function (root) {

  var ApiUtil = root.ApiUtil = {
    fetchWebsites: function () {
      $.get('api/websites', function(websites){
        ApiActions.receiveAllWebsites(websites);
      });
    },
    createWebsite: function(url){
      $.post('api/websites', { url: url }, function(website) {
        ApiActions.createWebsite(website);
      }).fail(function () {
        ApiActions.createWebsiteError;
      });
    },
    fetchUser: function (user) {
      $.get('users/holder', function(user){
        ApiActions.receiveUser(user);
      });
    }
  };
})(this);
