import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
// import FriendList from "./components/FriendList";
import AddFriend from "./components/AddFriend";

class App extends React.Component {
  state = { credentials: {} };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="nav">
            <Link to="/login">Login</Link>
            <Link to="/protected">Friends List</Link>
            <Link to="/addfriend">Add New Friend</Link>
          </div>

          <Switch>
            <Route path="/login" component={Login} />

            {/* <PrivateRoute exact path="/protected" component={FriendList} /> */}
            <PrivateRoute exact path="/addFriend" component={AddFriend} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;