window.UnreadActions = {
  passUnreads: function (unreadCount) {
    debugger
    AppDispatcher.dispatch({
      actionType: UnreadConstants.SENT_UNREAD,
      count: unreadCount
    });
  },
  subtractUnreads: function (unreadCount) {
    debugger
    AppDispatcher.dispatch({
      actionType: UnreadConstants.RESET_UNREAD,
      count: unreadCount
    });
  }
};
