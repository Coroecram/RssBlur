(function (root) {

  var ArticleApiUtil = root.ArticleApiUtil = {
    fetchArticles: function (feed) {
      $.get('api/articles', {url: feed.url, website_id: feed.id},
      function(articles){
        ArticleApiActions.receiveAllArticles(articles);
      },
      'json');
    },

    fetchUnread: function (id, success, error) {
      $.ajax({
        url: '/api/user_articles/unread/' + id,
        type: 'GET',
        dataType: 'json',
        error: function (response) {
          error && error(response.responseText);
        },
        success: function (data) {
          success && success(data);
          }
        });
    },

    fetchUnreadCount: function (id, success, error) {
      $.ajax({
        url: '/api/user_articles/unreadcount/' + id,
        type: 'GET',
        dataType: 'json',
        error: function (response) {
          error && error(response.responseText);
        },
        success: function (data) {
          success && success(data);
          }
        });
    },

    markRead: function (articleId, success, error) {
      $.ajax({
        url: '/api/user_articles/read/' + articleId,
        type: 'POST',
        dataType: 'json',
        error: function (response) {
          error && error(response.responseText);
        },
        success: function (unread) {
          ArticleApiActions.markedRead();
          success && success();
          }
        });
    },

    markAllRead: function (id, success, error) {
      $.ajax({
        url: '/api/user_articles/allread',
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
