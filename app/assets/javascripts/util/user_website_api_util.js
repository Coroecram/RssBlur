(function (root) {

  var UserWebsiteApiUtil = root.UserWebsiteApiUtil = {
    deleteAssociation: function (id) {
      $.ajax({
        url: '/api/user_articles/nil',
        type: 'DELETE',
        data: id,
      });
    }
  };
})(this);
