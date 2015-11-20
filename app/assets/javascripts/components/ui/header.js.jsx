var Header = React.createClass({

  componentDidMount: function () {
    SidebarClickedStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    SidebarClickedStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({articles: ArticleStore.all()});
  },

  render: function () {
    return (
          <div className="articles-header">
            <div className="header-focus"></div>
            <div className="sign-out" onClick={this.props.clickHandler}> Sign Out </div>
          </div>
          );
  }
});
