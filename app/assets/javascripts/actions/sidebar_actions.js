window.SidebarActions = {
  setSidebarClicked: function (object) {
    SidebarDispatcher.dispatch({
      actionType: SidebarClickedConstants.CLICK_RECEIVED,
      object: object
    });
  }
};
