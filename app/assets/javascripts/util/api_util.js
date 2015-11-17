
(function (root) {

  var ApiUtil = root.ApiUtil = {
    fetchWebsites: function(){
      $.get('api/websites', function(websites){
        ApiActions.receiveAll(websites);
      });
    },
    createWebsite: function(data){
      $.post('api/websites', { website: data }, function(website) {
        ApiActions.receiveAll([website]);
      });
    }
  }
})(this);
