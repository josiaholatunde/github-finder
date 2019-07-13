import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
    user: {},
    repos: []
  }
  async componentDidMount() {
    this.setState({ loading: true });
    const response = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: response.data, loading: false });
  }

  handleSearch = async (text) => {
    text = !text ? 'a': text;
    this.setState({ loading: true });
    const response = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: response.data.items, loading: false });
    console.table('Yo', response.data);
  }

  getUser = async (userName) => {

    this.setState({ loading: true });
    const response = await axios.get(`https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ user: response.data, loading: false });
    console.table('Yo', response.data);
  }
  getUserRepos = async (userName) => {

    this.setState({ loading: true });
    const response = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=date:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ repos: response.data, loading: false });
    console.table('Yo', response.data);
  }
  clearUsers = e => this.setState({users: [], loading: false});

  setAlert = (msg, cssType) => {
    this.setState({alert: {msg, cssType}});
    setTimeout(() => this.setState({alert: null}), 5000)
  }
  render() {
    const {users, alert, user, loading, repos} = this.state;
    return (
      <div className="App">
      
        <Router>
          <Navbar title="Github Finder" icon="fa fa-github" />
          <Switch>
          <div className="container">
          <Route exact path='/' render={(props) => {
            return (
              <Fragment>
                <Route>
                <Alert alert={alert} />
                  <Search 
                    searchUsers={this.handleSearch}  
                    setAlert={this.setAlert}
                    clearUsers={this.clearUsers} 
                    showClearBtn={users.length > 0 ? true: false}/>
                  <Users {...this.state} />
                  </Route>
              </Fragment>
            )
          }} />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={(props) => (
              <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} repos={repos} user={user} loading={loading} />
            )} />
          </div>
          </Switch>  
      </Router>
      </div>
    );
  }
}

export default App;
