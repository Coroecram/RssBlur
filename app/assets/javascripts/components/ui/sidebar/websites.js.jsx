var Websites = React.createClass({

  getInitialState: function () {
    return {websites: WebsiteStore.all()};
  },

  componentDidMount: function () {
    WebsiteStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    WebsiteStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({websites: WebsiteStore.all()});
  },

  render: function () {
    return(
      <ul className="sidebar-ul">
        <AllArticles websites={this.state.websites}/>
        {this.state.websites.map(function (website) {
          return <WebsiteListItem key={website.id} website={website} />;
        })}
      </ul>
    );
  }
});
