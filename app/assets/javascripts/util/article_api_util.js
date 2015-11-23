(function (root) {

  var ArticleApiUtil = root.ArticleApiUtil = {
    fetchArticles: function (feed) {
      debugger
      $.get('api/articles', {url: feed.url, website_id: feed.id},
      function(articles){
        ApiActions.receiveAllArticles(articles);
      },
      'json');
    }
  };
})(this);
