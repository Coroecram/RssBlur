var Sidebar = React.createClass({

  getInitialState: function () {
    return {currentUser: SigninStore.fetch()};
  },

  componentDidMount: function () {
    SigninStore.addChangeListener(this._onChange);
    ApiUtil.fetchUser();
  },

  _onChange: function () {
    this.setState({currentUser: SigninStore.fetch()});
  },

  render: function () {
    var sidebar;
    if (this.state.currentUser) {
      sidebar =     <div>
                        <div className="sidebar-header">
                          {this.state.currentUser.username}
                        </div>
                        <WebsiteList />
                    </div>
    }
    return (
          <div className="sidebar">
            {sidebar}
            <SidebarFooter />
          </div>
          );
  }
});
