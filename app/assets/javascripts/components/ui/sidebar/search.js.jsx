var Search = React.createClass({

  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

  getInitialState: function () {
    return {query: "", page: 1};
  },

  submit: function (event) {
    event.preventDefault();
    SearchApiUtil.search(this.state.query, this.state.page, this.blankState);
  },

  blankState: function () {
    this.setState({query: ""});
  },

  componentWillReceiveProps: function () {
    this.blankState();
  },

  render: function () {
      return (
              <div>
                <form className="search-form" autoComplete="off" onSubmit={ this.submit }>
                  <label htmlFor="query" >Search for Articles:</label>
                      <input type="text"
                             name="query"
                             valueLink={this.linkState('query')}
                             id="website-url"/>
                    <button type="submit" className="search">
                      <i className="fa fa-search" onClick={ this.submit } ></i>
                    </button>
                </form>
              </div>
            );
    }
});
