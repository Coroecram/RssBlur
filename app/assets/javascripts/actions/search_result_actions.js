var SearchResultActions = {
  receiveResults: function (results) {
    ArticleDispatcher.dispatch({
      actionType: SearchResultConstants.RECEIVE_RESULTS,
      results: results
    });
  }

};
