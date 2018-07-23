var Search = React.createClass({

  getInitialState: function () {
    return {query: "", filter: "all"};
  },

  componentDidMount: function(){
    React.findDOMNode(this.refs.search).focus();
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
                      <input type="text"
                             onChange={ this.search }
                             id="search"
                             ref="search"
                             placeholder={'Search Articles'} />
                      <div className="search-options">
                        <p>Search By: </p>
                        <div className="filter-choices" onClick={ this.chooseFilter }>
                          <p id="filter-all" className={allActive}>All</p>
                          <p id="filter-title" className={titleActive}>Title</p>
                          <p id="filter-summary" className={summaryActive}>Summary</p>
                          <p id="filter-author" className={authorActive}>Author</p>
                      </div>
                    </div>
              </div>
            );
    }
});
