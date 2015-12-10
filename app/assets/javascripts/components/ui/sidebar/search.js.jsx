var Search = React.createClass({

  search: function (event) {
    ArticleApiActions.search(event.currentTarget.value);
  },

  blankState: function () {
    this.setState({query: ""});
  },

  componentWillReceiveProps: function () {
    this.blankState();
  },

  render: function () {
      return (
              <div className="search-form">
                  <label htmlFor="query" >Search for Articles:</label>
                      <input type="text"
                             name="query"
                             onChange={ this.search }
                             id="website-url"/>
              </div>
            );
    }
});
