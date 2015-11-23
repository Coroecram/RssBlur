window.WebsiteApiActions = {
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

  setSidebarClicked: function (object) {
    debugger
    AppDispatcher.dispatch({
      actionType: SidebarClickedConstants.CLICK_RECEIVED,
      object: object
    });
  }
};
