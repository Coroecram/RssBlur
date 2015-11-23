var SidebarFooter = React.createClass({

  getInitialState: function () {
    return {formShow: false};
  },

  toggleNewWebsiteForm: function () {
    this.setState({formShow: !this.state.formShow});
  },

  _onChange: function () {
    this.setState({formShow: false});
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
