window.ArticleApiActions = {
  setArticleClicked: function (id) {
    AppDispatcher.dispatch({
      actionType: ArticleClickedConstants.CLICK_RECEIVED,
      id: id
    });
  },

  receiveAllArticles: function (articles) {
    debugger
    AppDispatcher.dispatch({
      actionType: ArticleConstants.ARTICLES_RECEIVED,
      articles: articles
    });
  }
};
