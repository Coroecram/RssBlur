(function (root) {
  var _websites = [];
  var CHANGE_EVENT = 'changed';

  var setWebsites = function (websites) {
    _websites = websites;
  };

  var addWebsite = function (website) {
    _websites.push(website);
  };

  var deleteWebsite = function (id) {
      for (var i = 0; i < _websites.length; i++){
        if (id === _websites[i].id) {
          UserWebsiteApiUtil.deleteAssociation(_websites[i].id);
          _websites.splice(i, 1);
        }
      }
      return null;
    };

  var WebsiteStore = root.WebsiteStore = $.extend({}, EventEmitter.prototype, {

    all: function () {
      return _websites.slice(0);
    },

    fetch: function () {
      return _websites[0];
    },

    find: function(id) {
      for (var i = 0; i < _websites.length; i++){
        if (id === _websites[i].id) {
          return _websites[i];
        }
      }
      return null;
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

    dispatchToken: WebsiteDispatcher.register(function (payload) {
      switch (payload.actionType) {
      case (WebsiteConstants.WEBSITES_RECEIVED):
        setWebsites(payload.websites);
        WebsiteStore.emitChange();
        break;
      case (WebsiteConstants.WEBSITE_CREATED):
        addWebsite(payload.website);
        WebsiteStore.emitChange();
        break;
      case (WebsiteConstants.WEBSITE_DELETE):
        deleteWebsite(payload.id);
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
