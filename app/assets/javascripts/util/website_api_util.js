$.ajaxSetup({timeout: 10000});
(function (root) {

  var WebsiteApiUtil = root.WebsiteApiUtil = {

    fetchWebsites: function (id, success, error) {
      $.ajax({
        url: '/api/websites',
        type: 'GET',
        dataType: 'json',
        data: id,
        error: function (response) {
          error && error(response);
        },
        success: function (websites) {
          success && success();
          WebsiteApiActions.receiveAllWebsites(websites);
        }
      });
    },

    createWebsite: function (url, success, error) {
      $.ajax({
        url: '/api/websites',
        type: 'POST',
        dataType: 'json',
        data: url,
        error: function (response) {
          error && error(response);
        },
        success: function (website) {
          success && success(website);
        }
      });
    },

    fetchClickedWebsite: function (id, success, error) {
      $.ajax({
        url: '/api/websites/' + id,
        type: 'GET',
        dataType: 'json',
        data: id,
        error: function () {
          error && error();
          SidebarActions.setSidebarClicked("all");
        },
        success: function (website) {
          success && success();
          SidebarActions.setSidebarClicked(website);
        }
      });
    },

    retrieveRSSURL: function (credentials, success, error) {
      $.ajax({
        url: '/api/websites/feed',
        type: 'GET',
        dataType: 'json',
        data: credentials,
        error: function (response) {
          error && error(response);
        },
        success: function (feedURL) {
          success && success(feedURL);
        }
      });
    }
  };
})(this);
