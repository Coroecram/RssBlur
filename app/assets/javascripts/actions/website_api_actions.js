window.WebsiteApiActions = {
  receiveAllWebsites: function (websites) {
    WebsiteDispatcher.dispatch({
      actionType: WebsiteConstants.WEBSITES_RECEIVED,
      websites: websites
    });
  },

  createWebsite: function (website) {
    WebsiteDispatcher.dispatch({
      actionType: WebsiteConstants.WEBSITE_CREATED,
      website: website
    });
  },

  deleteWebsite: function (id) {
    UnreadDispatcher.dispatch({
      actionType: UnreadConstants.RESET_UNREAD,
    });
    ArticleDispatcher.dispatch({
      actionType: ArticleConstants.WEBSITE_DELETED,
      id: id
    });
    WebsiteDispatcher.dispatch({
      actionType: WebsiteConstants.WEBSITE_DELETE,
      id: id
    });
  },

  createWebsiteError: function () {
    WebsiteDispatcher.dispatch({
      actionType: WebsiteConstants.WEBSITE_ERROR
    });
  }
};
