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
    WebsiteDispatcher.dispatch({
      actionType: WebsiteConstants.WEBSITE_DELETE,
      id: id
    });
  },

  createWebsiteError: function () {
    WebsiteDispatcher.dispatch({
      actionType: WebsiteConstants.WEBSITE_ERROR
    });
  },

  fetchWebsite: function (website) {
    WebsiteDispatcher.dispatch({
      actionType: WebsiteConstants.FETCH_WEBSITE,
      website: website
    });
  },

  setSidebarClicked: function (object) {
    debugger
    WebsiteDispatcher.dispatch({
      actionType: SidebarClickedConstants.CLICK_RECEIVED,
      object: object
    });
  }
};
