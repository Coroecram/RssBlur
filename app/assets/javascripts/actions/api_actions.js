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

  fetchWebsite: function (website) {
    AppDispatcher.dispatch({
      actionType: WebsiteConstants.FETCH_WEBSITE,
      website: website
    })
  }
}
