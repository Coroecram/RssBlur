(function (root) {
  var _user
  var CHANGE_EVENT = 'changed'

  var setUser = function (user) {
    _user = user;
  };

  var UserStore = root.UserStore = $.extend({}, EventEmitter.prototype, {

    fetch: function () {
      return _user;
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

    dispatchToken: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
      case (UserConstants.USER_FETCHED):
        setUser(payload.user);
        UserStore.emitChange();
        break;
      case (UserConstants.USER_CREATED):
        setUser(payload.user);
        UserStore.emitChange();
        break;
        default:
      }
    })
  });
})(this);
