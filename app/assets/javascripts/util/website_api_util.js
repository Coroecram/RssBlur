(function (root) {

  var WebsiteApiUtil = root.WebsiteApiUtil = {

    fetchWebsites: function () {
      $.get('api/websites', function(websites){
        WebsiteApiActions.receiveAllWebsites(websites);
      },
      'json');
    },
    createWebsite: function(url, success, error){
      $.post('api/websites', url, function(website) {
        WebsiteApiActions.createWebsite(website);
        success();
      },
      'json').fail(function (data) {
        error(data);
      });
    },
    fetchClickedWebsite: function (id) {
      $.get('api/websites/' + id, function(website){
        WebsiteApiActions.setSidebarClicked(website);
      },
      'json');
    },

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
    }

  };
})(this);
