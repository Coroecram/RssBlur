$.ajaxSetup({timeout: 5000});
(function (root) {

  var ApiUtil = root.ApiUtil = {
    fetchWebsites: function () {
      $.get('api/websites', function(websites){
        ApiActions.receiveAllWebsites(websites);
      },
      'json');
    },
    createWebsite: function(url, success, error){
      $.post('api/websites', { url: url }, function(website) {
        ApiActions.createWebsite(website);
        success();
      },
      'json').fail(function (data) {
        error(data);
      });
    },
    fetchUser: function (user) {
      $.get('users/holder', function(user){
        ApiActions.receiveUser(user);
      },
      'json');
    }
  };
})(this);
