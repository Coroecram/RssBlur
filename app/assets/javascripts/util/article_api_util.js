(function (root) {

  var ArticleApiUtil = root.ArticleApiUtil = {
    fetchArticles: function (feed) {
      $.get('api/articles', {url: feed.url, website_id: feed.id},
      function(articles){
        ArticleApiActions.receiveAllArticles(articles);
      },
      'json');
    }
  };
})(this);
