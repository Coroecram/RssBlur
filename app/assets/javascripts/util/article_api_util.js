(function (root) {

  var ArticleApiUtil = root.ArticleApiUtil = {
    fetchArticles: function (feed) {
      $.get('api/articles', {url: feed.url, website_id: feed.id},
      function(articles){
        ArticleApiActions.receiveAllArticles(articles);
      },
      'json');
    },

    fetchUnreadCount: function (id, success) {
      $.ajax({
        url: '/api/users',
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
    }
  };
})(this);
