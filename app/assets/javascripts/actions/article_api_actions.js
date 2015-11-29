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

  resetAllArticles: function () {
    AppDispatcher.dispatch({
      actionType: ArticleConstants.RESET_ARTICLES
    });
  },

  markedRead: function () {
    AppDispatcher.dispatch({
      actionType: ArticleConstants.MARKED_READ
    });
  }
};
