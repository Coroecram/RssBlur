(function (root) {

  var ArticleApiUtil = root.ArticleApiUtil = {
    fetchArticles: function (feed) {
      $.get('api/articles', {url: feed.url, website_id: feed.id},
      function(articles){
        ArticleApiActions.receiveAllArticles(articles);
      },
      'json');
    },

    fetchAllArticles: function (page, success, error) {
      $.ajax({
        url: '/api/all_articles',
        type: 'GET',
        dataType: 'json',
        data: {page: page},
        error: function (response) {
          error && error(response.responseText);
        },
        success: function (data) {
          ArticleApiActions.receiveAllArticles(data);
          success && success(data);
          }
      });
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

    fetchAllUnread: function (success, error) {
      $.ajax({
        url: '/api/user_articles/all_unread',
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
          success && success(data.count);
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

    markAllRead: function (success, error) {
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
