var SidebarFooter = React.createClass({

  getInitialState: function () {
    return {formShow: false};
  },

  componentDidMount: function () {
    WebsiteStore.addChangeListener(this._onChange);
    SidebarClickedStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    WebsiteStore.removeChangeListener(this._onChange);
    SidebarClickedStore.addChangeListener(this._onChange);
  },

  toggleNewWebsiteForm: function () {
    this.setState({formShow: !this.state.formShow});
  },

  _onChange: function () {
    if (this.state.formShow) {
      this.setState({formShow: false});
    }
  },

  render: function () {
    return (
            <div className="sidebar-footer">
              <WebsiteForm show={this.state.formShow} />
              <span onClick={this.toggleNewWebsiteForm}>+</span>
              <div className="footer-options" />
              <div className="footer-settings" />
            </div>
          );
  }
});
