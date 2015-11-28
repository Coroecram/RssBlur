(function (root) {

  var ArticleApiUtil = root.ArticleApiUtil = {
    fetchArticles: function (feed) {
      $.get('api/articles', {url: feed.url, website_id: feed.id},
      function(articles){
        ArticleApiActions.receiveAllArticles(articles);
      },
      'json');
    },

    fetchUnreadCount: function (id, success, error) {
      debugger
      $.ajax({
        url: '/api/user_articles/unread/' + id,
        type: 'GET',
        dataType: 'json',
        error: function (response) {
          error && error(response.responseText);
        },
        success: function (unread) {
          debugger
          success && success(unread.count);
          }
        });
    }
  };
})(this);
