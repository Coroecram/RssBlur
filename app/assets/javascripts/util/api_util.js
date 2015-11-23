// $.ajaxSetup({timeout: 5000});
(function (root) {

  var ApiUtil = root.ApiUtil = {
    fetchUser: function (user) {
      $.get('users/holder', function(user){
        ApiActions.receiveUser(user);
      },
      'json');
    },
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
    },
    fetchArticles: function (feed, page) {
      $.get('api/articles', {url: feed.url, website_id: feed.id, page: page}, function(articles){
        ApiActions.receiveAllArticles(articles);
      },
      'json');
    }
  };
})(this);
