var Sidebar = React.createClass({

  getInitialState: function () {
    return {currentUser: UserStore.fetch()};
  },

  componentDidMount: function () {
    UserStore.addChangeListener(this._onChange);
    ApiUtil.fetchUser();
  },

  _onChange: function () {
    this.setState({currentUser: UserStore.fetch()});
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
    var formClass = classNames({
      'hidden': true,
      'btn-pressed': this.state.isPressed,
      'btn-over': !this.state.isPressed && this.state.isHovered
    });
    return (
          <div className="sidebar">
            {sidebar}
            <SidebarFooter />
          </div>
          );
  }
});
