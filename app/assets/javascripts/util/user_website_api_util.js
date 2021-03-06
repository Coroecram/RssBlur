(function (root) {

  var UserWebsiteApiUtil = root.UserWebsiteApiUtil = {
    deleteAssociation: function (website_id, success) {
      $.ajax({
        url: '/api/user_websites',
        type: 'DELETE',
        data: { website_id: website_id},
        success: function () {
          success && success();
        }
      });
    }
  };
})(this);
