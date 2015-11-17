var UserHome = React.createClass({

  componentDidMount: function () {
    ApiUtil.fetchWebsites();
  },

  render: function () {
    return (
            <div className="sidebar">
              <WebsiteList />
            </div>
          );
  }
});
