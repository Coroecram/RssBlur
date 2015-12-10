var Search = React.createClass({

  mixins: [React.addons.LinkedStateMixin, ReactRouter.History],

  getInitialState: function () {
    return {query: ""};
  },

  submit: function (event) {
    event.preventDefault();
    debugger
    ArticleStore.search(this.state.query);
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
                    <br/>
                    <button type="submit" class="search">
                      <i class="fa fa-search" onClick={ this.submit } ></i>
                    </button>
                </form>
                <div className="website-form-triangle" />
              </div>
            );
    }
});
