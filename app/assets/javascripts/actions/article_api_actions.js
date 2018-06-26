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

  resetArticles: function () {
    ArticleDispatcher.dispatch({
      actionType: ArticleConstants.RESET_ARTICLES
    });
  },

  markedRead: function () {
    ArticleDispatcher.dispatch({
      actionType: ArticleConstants.MARKED_READ
    });
  },

  search: function (searchParams) {
    ArticleDispatcher.dispatch({
      actionType: ArticleConstants.SEARCH,
      searchParams: searchParams
    });
  },
  sort: function (sortParams) {
    ArticleDispatcher.dispatch({
      actionType: ArticleConstants.SORT,
      sortParams: sortParams
    });
  }
};
