var SearchResultActions = {
  receiveResults: function (results) {
    debugger
    ArticleDispatcher.dispatch({
      actionType: SearchResultConstants.RECEIVE_RESULTS,
      results: results
    });
  }

};
