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
      $.ajax({
        url: '/api/user_articles/unreadcount/' + id,
        type: 'GET',
        dataType: 'json',
        error: function (response) {
          error && error(response.responseText);
        },
        success: function (unread) {
          success && success(unread.count);
          }
        });
    },

    markRead: function (id, success, error) {
      $.ajax({
        url: 'user_articles/unread/' + id,
        type: 'POST',
        dataType: 'json',
        error: function (response) {
          error && error(response.responseText);
        },
        success: function (unread) {
          success && success(unread.count);
          }
        });
    },

    markAllRead: function (id, success, error) {
      $.ajax({
        url: 'user_articles/unreads',
        type: 'POST',
        dataType: 'json',
        error: function (response) {
          error && error(response.responseText);
        },
        success: function (unread) {
          success && success(unread.count);
          }
        });
    }

  };
})(this);
