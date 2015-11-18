(function (root) {
  var _currentUser
  var CHANGE_EVENT = 'changed'

  var setSignin = function (user) {
    _currentUser = user;
  };

  var SigninStore = root.SigninStore = $.extend({}, EventEmitter.prototype, {

    fetch: function () {
      return _currentUser;
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
        setSignin(payload.user);
        SigninStore.emitChange();
        break;
      case (UserConstants.USER_CREATED):
        setSignin(payload.user);
        SigninStore.emitChange();
        break;
        default:
      }
    })
  });
})(this);
