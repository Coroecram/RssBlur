(function (root) {
  var _articles = [];
  var CHANGE_EVENT = 'changed';
  var searchQuery = "";

  var setArticles = function (articles) {
    debugger
    uniqueArticles = [];
    uniqueIds = {};
    for (var i = 0; i < _articles.length; i++) {
      if (!uniqueIds[articles[i].id]) {
        uniqueIds[articles[i].id] = true;
        uniqueArticles.push(articles[i]);
      }
    }
    _articles = uniqueArticles;
  };

  var resetArticles = function () {
    _articles = [];
  };

  var addArticles = function (articles) {
    _articles.concat(articles);
  };

  var setQuery = function(query) {
    searchQuery = query;
  };

  var ArticleStore = root.ArticleStore = $.extend({}, EventEmitter.prototype, {

    all: function () {
      debugger
      if (searchQuery === "") {
        return _articles.slice(0);
      } else {
        var query = new RegExp(searchQuery)
        var _articleSet = [];
        debugger
        for (var i = 0; i < _articles.length; i++) {
          if  (_articles[i].title.search(query) != -1 ||
               _articles[i].author.search(query) != -1 ||
               _articles[i].summary.search(query) != -1) {
                  _articleSet.push(_articles[i]);
                }
        }
        debugger
      }
    },

    reset: function () {
      _articles = [];
    },

    find: function(id) {
      for (var i = 0; i < _articles.length; i++){
        if (id === _articles[i].id) {
          return _articles[i];
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

    dispatchToken: ArticleDispatcher.register(function (payload) {
      switch (payload.actionType) {
      case (ArticleConstants.ARTICLES_RECEIVED):
        setArticles(payload.articles);
        ArticleStore.emitChange();
        break;
      case (ArticleConstants.SEARCH):
        setQuery(payload.query);
        ArticleStore.emitChange();
        break;
      case (ArticleConstants.ARTICLE_CREATED):
        addArticles(payload.article);
        ArticleStore.emitChange();
        break;
      case (ArticleConstants.MARKED_READ):
        ArticleStore.emitChange();
        break;
        default:
      }
    })
  });
})(this);
