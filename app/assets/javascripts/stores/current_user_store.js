(function (root) {
  var _currentUser;
  var CHANGE_EVENT = 'changed';

  var setSignin = function (user) {
    _currentUser = user;
  };

  var resetSignin = function (user) {
    _currentUser = {};
  };

  var setUpdate = function (user) {
    _currentUser = user;
  };

  var CurrentUserStore = root.CurrentUserStore = $.extend({}, EventEmitter.prototype, {

    fetch: function () {
      return $.extend({}, _currentUser);
    },

    isLoggedIn: function () {
      return (typeof _currentUser.id !== "undefined");
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
        setSignin(payload.user);
        CurrentUserStore.emitChange();
        break;
      case (CurrentUserConstants.USER_CREATED):
        setSignin(payload.user);
        CurrentUserStore.emitChange();
        break;
      case (CurrentUserConstants.USER_SIGN_OUT):
        resetSignin();
        CurrentUserStore.emitChange();
        break;
      case (CurrentUserConstants.USER_UPDATED):
        setUpdate(payload.user);
        CurrentUserStore.emitChange();
        break;
        default:
      }
    })
  });
})(this);
