var WebsiteFocus = React.createClass({

  mixins: [ReactRouter.History],

  getInitialState: function () {
    return {focus: undefined};
  },

  componentDidMount: function () {
    SidebarClickedStore.addChangeListener(this._onChange);
    WebsiteApiUtil.fetchClickedWebsite(this.props.params.id, this._onFetchSuccess, this._onFetchFail);
  },

  componentWillUnmount: function () {
    SidebarClickedStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    clickedItem = SidebarClickedStore.fetch();
    if (clickedItem.is_feed) {
      this.history.pushState(null, "/website/" + clickedItem.id)
    } else {
      this.setState({focus: undefined});
      WebsiteApiUtil.fetchClickedWebsite(clickedItem);
    }
    this.setState({sidebar: clickedItem});
  },

  _onFetchSuccess: function () {
    debugger
  },

  _onFetchFail: function () {
    this.setState({focus: "failed"});
  },

  render: function () {
    return (
            <div className="website-focus group">
              <p>Your Websites Here!</p>
            </div>
          );
  }
});
