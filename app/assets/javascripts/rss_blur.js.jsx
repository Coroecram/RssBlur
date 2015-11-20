$(document).ready(function () {
  debugger
  var root = document.getElementById('content');
  var Route = ReactRouter.Route;
  var Router = ReactRouter.Router;
  var IndexRoute = ReactRouter.IndexRoute;

  var App = React.createClass({
    render: function () {
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
        <IndexRoute component={SignIn} />
        <Route path="/create_account" component={SignUp} />
        <Route path="/home" component={UserHome} />
        <Route path="/website/:id" components={{sidebar:UserHome, articles:ArticleIndex}} />
      </Route>
    );

    React.render(<Router>{routes}</Router>, root);
});
