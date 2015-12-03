window.ArticleApiActions = {
  setArticleClicked: function (id) {
    ArticleDispatcher.dispatch({
      actionType: ArticleClickedConstants.CLICK_RECEIVED,
      id: id
    });
  },

  receiveAllArticles: function (articles) {
    ArticleDispatcher.dispatch({
      actionType: ArticleConstants.ARTICLES_RECEIVED,
      articles: articles
    });
  },

  receiveAllArticles: function (articles) {
    ArticleDispatcher.dispatch({
      actionType: ArticleConstants.ARTICLES_RECEIVED,
      articles: articles
    });
  },

  resetAllArticles: function () {
    ArticleDispatcher.dispatch({
      actionType: ArticleConstants.RESET_ARTICLES
    });
  },

  markedRead: function () {
    ArticleDispatcher.dispatch({
      actionType: ArticleConstants.MARKED_READ
    });
  }
};
