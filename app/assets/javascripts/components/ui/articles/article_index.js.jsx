var ArticleIndex = React.createClass({
  getInitialState: function () {
    return {sidebar: SidebarClickedStore.fetch()};
  },

  componentDidMount: function () {
    // debugger
    SidebarClickedStore.addChangeListener(this._onChange);
    ApiUtil.fetchClickedWebsite(this.props.params.id);
  },

  componentWillUnmount: function () {
    SidebarClickedStore.addChangeListener(this._onChange);
  },

  componentWillReceiveProps: function (newProps) {
    // debugger
    ApiActions.setSidebarClicked(parseInt(this.newProps.params.id));
  },

  _onChange: function () {
    // debugger
    this.setState({sidebar: SidebarClickedStore.fetch()});
  },

  render: function () {
    var articles;
    if (this.state.sidebar) {
      articles = <Articles sidebar={this.state.sidebar}/>;
    }
    return (
            <div className="article-index">
              <ArticleHeader focus={this.state.sidebar} />
              {articles}
            </div>
          );
  }
});
