var SearchApiUtil = {

  search: function (query, page, success) {
    $.ajax({
      url: '/api/search',
      type: 'GET',
      dataType: 'json',
      data: {query: query, page: page},
      success: function (results) {
        debugger
        SearchResultActions.receiveResults(results);
        success && success();
      }
    });
  },

};
