(function (root) {
  var _count = 0;
  var CHANGE_EVENT = 'changed';

  var addUnreads = function (count) {
    _count += count;
  };

  var resetUnreads = function (count) {
    _count -= count;
  };

var UnreadStore = root.UnreadStore = $.extend({}, EventEmitter.prototype, {

  fetch: function () {
    return _count;
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  dispatchToken: UnreadDispatcher.register(function (payload) {
    switch (payload.actionType) {
    case (UnreadConstants.PASS_UNREAD):
      addUnreads(payload.count);
      UnreadStore.emitChange();
      break;
    case (UnreadConstants.RESET_UNREADS):
      debugger
      resetUnreads(payload.count);
      break;
      default:
    }
  })
});
})(this);
