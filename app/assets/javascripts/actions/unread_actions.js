window.UnreadActions = {
  passUnreads: function (unreadCount) {
    UnreadDispatcher.dispatch({
      actionType: UnreadConstants.PASS_UNREAD,
      count: unreadCount
    });
  },
  resetUnreads: function (unreadCount) {
    UnreadDispatcher.dispatch({
      actionType: UnreadConstants.RESET_UNREAD,
      count: unreadCount
    });
  }
};
