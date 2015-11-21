var Sidebar = React.createClass({

  getInitialState: function () {
    return {currentUser: CurrentUserStore.fetch()};
  },

  componentDidMount: function () {
    CurrentUserStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    CurrentUserStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({currentUser: CurrentUserStore.fetch()});
  },

  render: function () {
    var sidebar;
    if (this.state.currentUser) {
      sidebar =     <div>
                        <Websites />
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
