(function (root) {

  var UserWebsiteApiUtil = root.UserWebsiteApiUtil = {
    deleteAssociation: function (website_id) {
    debugger
      $.ajax({
        url: '/api/user_websites',
        type: 'DELETE',
        data: {website_id: website_id}
      });
    }
  };
})(this);
