(function (root) {
  var _websites = [];
  var CHANGE_EVENT = 'changed'

  var setWebsites = function (websites) {
    _websites = websites;
  };

  var addWebsite = function (website) {
    _websites.push(website);
  };

  var WebsiteStore = root.WebsiteStore = $.extend({}, EventEmitter.prototype, {

    all: function () {
      return _websites.slice(0);
    },

    fetch: function () {
      return _websites[0];
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
      case (WebsiteConstants.WEBSITES_RECEIVED):
        setWebsites(payload.websites);
        WebsiteStore.emitChange();
        break;
      case (WebsiteConstants.WEBSITE_CREATED):
        addWebsite(payload.website);
        WebsiteStore.emitChange();
        break;
      case (WebsiteConstants.FETCH_WEBSITE):
        WebsiteStore.setWebsite(payload.website);
        WebsiteStore.emitChange();
        break;
        default:
      }
    })
  });
})(this);
