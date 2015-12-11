(function (root) {
  var _articles = [];
  var CHANGE_EVENT = 'changed';
  var searchQuery = "";
  var searchFilter = "";
  var articleSet = []

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
    searchQuery = searchParams[0];
    searchFilter = searchParams[1];
  };

  var ArticleStore = root.ArticleStore = $.extend({}, EventEmitter.prototype, {

    all: function () {
      if (searchQuery === "") {
        return _articles.slice(0);
      } else {
        return this.searchResults();
      }
    },

    searchResults: function () {
      articleSet = [];
        var query = new RegExp(searchQuery, 'i')
        for (var i = 0; i < _articles.length; i++) {
          var n = articleSet.length
          if (searchFilter === "all") {
              this.searchTitle(_articles[i], query, n);
              this.searchSummary(_articles[i], query, n);
              this.searchAuthor(_articles[i], query, n);
            } else if (searchFilter === "title") {
              this.searchTitle(_articles[i], query, n);
            } else if (searchFilter === "summary") {
              this.searchSummary(_articles[i], query, n);
            } else if (searchFilter === "author") {
              this.searchAuthor(_articles[i], query, n);
            }
        }
      return articleSet;
    },

    searchTitle: function (article, query, length) {
      if  (article.title.search(query) != -1 &&
           length === articleSet.length) {
        articleSet.push(article);
      }
    },

    searchSummary: function (article, query, length) {
      if  (article.summary.search(query) != -1 &&
           length === articleSet.length) {
        articleSet.push(article);
      }
    },

    searchAuthor: function(article, query, length) {
      if  (article.author.search(query) != -1 &&
           length === articleSet.length) {
        articleSet.push(article);
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
      case (ArticleConstants.RESET_ARTICLES):
        ArticleStore.reset();
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
