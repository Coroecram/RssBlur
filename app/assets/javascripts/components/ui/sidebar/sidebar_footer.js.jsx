var SidebarFooter = React.createClass({

  getInitialState: function () {
    return {formShow: false};
  },

  componentDidMount: function () {
  },

  toggleNewWebsiteForm: function () {
    this.setState({formShow: !this.state.formShow});
  },

  _onChange: function () {
    this.setState({formShow: false});
  },

  render: function () {
    var websiteForm;
    if (this.state.formShow) {
      websiteForm = <WebsiteForm />;
    }
    return (
            <div className="sidebar-footer">
              {websiteForm}
              <span onClick={this.toggleNewWebsiteForm}>+</span>
              <div className="footer-options" />
              <div className="footer-settings" />
            </div>
          );
  }
});
