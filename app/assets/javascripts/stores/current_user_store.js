(function (root) {
  var _currentUser;
  var CHANGE_EVENT = 'changed';

  var setSignin = function (user) {
    _currentUser = user;
  };

  var setSignin = function () {
    _currentUser = {};
  };

  var CurrentUser = root.CurrentUser = $.extend({}, EventEmitter.prototype, {

    fetch: function () {
      return $.extend({}, _currentUser);
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
      case (CurrentUserConstants.USER_FETCHED):
        debugger
        setSignin(payload.user);
        CurrentUser.emitChange();
        break;
      case (CurrentUserConstants.USER_CREATED):
        setSignin(payload.user);
        CurrentUser.emitChange();
        break;
      case (CurrentUserConstants.USER_LOG_OUT):
        resetSignin();
        CurrentUser.emitChange();
        break;
        default:
      }
    })
  });
})(this);
