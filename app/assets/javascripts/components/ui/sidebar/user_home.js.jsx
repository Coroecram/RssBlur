var UserHome = React.createClass({

  componentDidMount: function () {
    WebsiteApiUtil.fetchWebsites();
  },

  render: function () {
    return (
            <div className="user-home">
              <Sidebar />
            </div>
          );
  }
});
