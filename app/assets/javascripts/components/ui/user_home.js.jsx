var UserHome = React.createClass({

  componentDidMount: function () {
    ApiUtil.fetchWebsites();
  },

  render: function () {
    return (
            <div className="user-home">
              <Sidebar />
              <WebsiteList />
            </div>
          );
  }
});
