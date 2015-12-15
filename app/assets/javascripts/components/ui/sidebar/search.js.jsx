var Search = React.createClass({

  getInitialState: function () {
    return {query: "", filter: "all"};
  },

  search: function (event) {
    var query = event.currentTarget.value;
    this.setState({query: query});
    searchParams = [query, this.state.filter];
    ArticleApiActions.search(searchParams);
  },

  blankState: function () {
    this.setState({query: "", filter: "all"});
  },

  chooseFilter: function (event) {
    var filter = event.target.textContent.toLowerCase();
    this.setState({filter: filter})
    this.changeSearchFilter(filter)
  },

  changeSearchFilter: function (filter) {
    ArticleApiActions.search([this.state.query, filter]);
  },

  componentWillReceiveProps: function () {
    this.blankState();
  },

  render: function () {
    var allActive = (this.state.filter === "all" ? "active" : "");
    var titleActive = (this.state.filter === "title" ? "active" : "");
    var summaryActive = (this.state.filter === "summary" ? "active" : "");
    var authorActive = (this.state.filter === "author" ? "active" : "");

      return (
              <div className="search-form group">
                  <label htmlFor="query" >Search Articles:</label>
                      <input type="text"
                             name="query"
                             onChange={ this.search }
                             id="website-url"/>
                      <p>Search By: </p>
                      <div className="filter-choices" onClick={ this.chooseFilter }>
                        <p className={allActive}>All</p>
                        <p className={titleActive}>Title</p>
                        <p className={summaryActive}>Summary</p>
                        <p className={authorActive}>Author</p>
                    </div>
              </div>
            );
    }
});
