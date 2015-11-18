(function (root) {
  var _articleClicked;
  var CHANGE_EVENT = 'changed';

  var setClicked = function (id) {
    articleClicked = ArticleStore.find(id);
    _articleClicked = articleClicked;
  };

  var ArticleClickedStore = root.ArticleClickedStore = $.extend({}, EventEmitter.prototype, {

    fetch: function () {
      return _articleClicked;
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
      case (ArticleClickedConstants.CLICK_RECEIVED):
        setClicked(payload.id);
        ArticleClickedStore.emitChange();
        break;
        default:
      }
    })
  });
})(this);
