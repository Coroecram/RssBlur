$(document).ready(function () {
  var root = document.getElementById('content');
  var Route = ReactRouter.Route;
  var Router = ReactRouter.Router;
  var IndexRoute = ReactRouter.IndexRoute;

  var App = React.createClass({

  mixins: [ReactRouter.History],

  getInitialState: function () {
    return { currentUser: null };
  },

  componentWillMount: function () {
    CurrentUserStore.addChangeListener(this._ensureLoggedIn);
    SessionApiUtil.fetchCurrentUser();
  },

  _ensureLoggedIn: function () {
    if (!CurrentUserStore.isLoggedIn() &&
        (this.props.location.pathname !== "/create_account" ||
        this.props.location.pathname !== "/sign_in")) {
      this.history.pushState(null, "/sign_in");
    } else {
      if (this.props.location.pathname === "/") {
        this.history.pushState(null, "/home");
      }
    }

    this.setState({currentUser: CurrentUserStore.fetch()});
  },

  render: function () {

    if (!this.state.currentUser) {
  return (
          <div>Loading...</div>
        );
      }

     return (
         <div>
           <header><title>RSS Blur</title></header>
           {this.props.children}
         </div>
     );
   }
  });

    var routes = (
      <Route path="/" component={App}>
        <Route path="/sign_in" component={SignIn} />
        <Route path="/create_account" component={SignUp} />
          <Route path="/home" component={UserHome}>
            <Route path="/websites/:id" component={ArticleIndex} />
            <Route path="/website/focus/:id" component={WebsiteFocus} />
          </Route>
      </Route>
    );

    React.render(<Router>{routes}</Router>, root);
});
