(function (root) {

  var WebsiteApiUtil = root.WebsiteApiUtil = {

    fetchWebsites: function () {
      $.get('api/websites', function(websites){
        ApiActions.receiveAllWebsites(websites);
      },
      'json');
    },
    createWebsite: function(url, success, error){
      $.post('api/websites', {url: url}, function(website) {
        ApiActions.createWebsite(website);
        success();
      },
      'json').fail(function (data) {
        error(data);
      });
    },
    fetchClickedWebsite: function (id) {
      $.get('api/websites/' + id, function(website){
        ApiActions.setSidebarClicked(website);
      },
      'json');
    }
  };
})(this);
