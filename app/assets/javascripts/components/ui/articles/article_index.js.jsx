var ArticleIndex = React.createClass({
  getInitialState: function () {
    return {sidebar: undefined};
  },

  componentDidMount: function () {
    debugger
    SidebarClickedStore.addChangeListener(this._onChange);
    this.setState({sidebar: SidebarClickedStore.fetch()});
  },

  componentWillUnmount: function () {
    SidebarClickedStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
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
