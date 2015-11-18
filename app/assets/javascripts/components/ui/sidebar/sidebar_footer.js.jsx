var SidebarFooter = React.createClass({

  getInitialState: function () {
    return null;
  },

  componentDidMount: function () {
  },

  showNewWebsiteForm: function () {
    console.log('show new website form');
  },

  _onChange: function () {
  },

  render: function () {
    return (
            <div className="sidebar-footer">
              <span onClick={this.showNewWebsiteForm}> +</span>
              <div className="footer-optons" />
              <div className="footer-settings" />
            </div>
           )
  }
});
