(function (root) {
  var _websiteClicked;
  var CHANGE_EVENT = 'changed';

  var setClicked = function (id) {
    websiteClicked = WebsiteStore.find(id);
    _websiteClicked = websiteClicked;
  };

  var WebsiteClickedStore = root.WebsiteClickedStore = $.extend({}, EventEmitter.prototype, {

    fetch: function () {
      return _websiteClicked;
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
      case (WebsiteClickedConstants.CLICK_RECEIVED):
        setClicked(payload.id);
        WebsiteClickedStore.emitChange();
        break;
        default:
      }
    })
  });
})(this);
