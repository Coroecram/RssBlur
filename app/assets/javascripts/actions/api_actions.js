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

  setClicked: function(id) {
    AppDispatcher.dispatch({
      actionType: ClickedConstants.CLICK_RECEIVED,
      id: id
    });
  }
};
