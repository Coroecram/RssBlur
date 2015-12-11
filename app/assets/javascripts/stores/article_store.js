(function (root) {
  var _articles = [];
  var CHANGE_EVENT = 'changed';
  var searchQuery = "";
  var searchFilter = "";

  var setArticles = function (articles) {
    uniqueArticles = [];
    uniqueIds = {};
    for (var i = 0; i < articles.length; i++) {
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

  var setQuery = function(searchParams) {
    searchQuery = query;
    searchFilter = query;
  };

  var ArticleStore = root.ArticleStore = $.extend({}, EventEmitter.prototype, {

    all: function () {
      if (searchQuery === "") {
        return _articles.slice(0);
      } else {
        return searchResults
      }
    },

    searchResults: function () {
        var query = new RegExp(searchQuery, 'i')
        var _articleSet = [];
        for (var i = 0; i < _articles.length; i++) {
          if (searchFilter === "all") {
              this.searchTitle(article[i], query);
              this.searchSummary(article[i], query);
              this.searchAuthor(article[i], query);
            } else if (searchFilter === "title") {
              this.searchTitle(article[i], query);
            } else if (searchFilter === "summary") {
              this.searchSummary(article[i], query);
            } else if (searchFilter === "author") {
              this.searchAuthor(article[i], query);
            }
        }
            return _articleSet;
    },

    searchTitle: function (article, regex) {
      if  (article.title.search(query) != -1) {
        _articleSet.push(article);
      }
    },

    searchSummary: function (article, regex) {
      if  (article.summary.search(query) != -1) {
        _articleSet.push(article);
      }
    },

    searchAuthor: function(article, regex) {
      if  (article.author.search(query) != -1) {
        _articleSet.push(article);
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
        setQuery(payload.searchParams);
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
