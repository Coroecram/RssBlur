(function (root) {

  var ArticleApiUtil = root.ArticleApiUtil = {
    fetchArticles: function (feed, page) {
      debugger
      $.get('api/articles', {url: feed.url, website_id: feed.id, page: page},
      function(articles){
        ApiActions.receiveAllArticles(articles);
      },
      'json');
    }
  };
})(this);
