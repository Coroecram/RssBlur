(function (root) {
  var _clicked;
  var CHANGE_EVENT = 'changed';

  var setClicked = function (id) {
    clicked = WebsiteStore.find(id);
    _clicked = clicked;
  };

  var ClickedStore = root.ClickedStore = $.extend({}, EventEmitter.prototype, {

    fetch: function () {
      return _clicked;
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
      case (ClickedConstants.CLICK_RECEIVED):
        setClicked(payload.id);
        ClickedStore.emitChange();
        break;
        default:
      }
    })
  });
})(this);
