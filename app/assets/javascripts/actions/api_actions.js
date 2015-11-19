window.ApiActions = {
  receiveAllWebsites: function (websites) {
    AppDispatcher.dispatch({
      actionType: WebsiteConstants.WEBSITES_RECEIVED,
      websites: websites
    });
  },

  createWebsite: function (website) {
    AppDispatcher.dispatch({
      actionType: WebsiteConstants.WEBSITE_CREATED,
      website: website
    });
  },

  deleteWebsite: function (id) {
    AppDispatcher.dispatch({
      actionType: WebsiteConstants.WEBSITE_DELETE,
      id: id
    });
  },

  createWebsiteError: function () {
    AppDispatcher.dispatch({
      actionType: WebsiteConstants.WEBSITE_ERROR
    });
  },

  fetchWebsite: function (website) {
    AppDispatcher.dispatch({
      actionType: WebsiteConstants.FETCH_WEBSITE,
      website: website
    });
  },

  receiveUser: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_FETCHED,
      user: user
    });
  },

  setSidebarClicked: function (object) {
    AppDispatcher.dispatch({
      actionType: SidebarClickedConstants.CLICK_RECEIVED,
      object: object
    });
  },

  setArticleClicked: function (id) {
    AppDispatcher.dispatch({
      actionType: ArticleClickedConstants.CLICK_RECEIVED,
      id: id
    });
  },

  fetchArticles: function (id) {
    AppDispatcher.dispatch({
      actionType: ArticleConstants.ARTICLES_RECEIVED,
      articles: articles
    });
  }
};
