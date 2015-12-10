var Search = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function () {
    return {query: ""};
  },

  search: function (event) {
    event.preventDefault();
    ArticleApiActions.search(this.state.query);
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
                             valueLink={this.linkState('query')}
                             onInput={this.search}
                             id="website-url"/>
              </div>
            );
    }
});
