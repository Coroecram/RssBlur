window.ArticleApiActions = {

  setArticleClicked: function (id) {
    AppDispatcher.dispatch({
      actionType: ArticleClickedConstants.CLICK_RECEIVED,
      id: id
    });
  },

  receiveAllArticles: function (articles) {
    AppDispatcher.dispatch({
      actionType: ArticleConstants.ARTICLES_RECEIVED,
      articles: articles
    });
  },

  resetArticles: function () {
    AppDispatcher.dispatch({
      actionType: ArticleConstants.ARTICLES_RESET,
    });
  }
};
