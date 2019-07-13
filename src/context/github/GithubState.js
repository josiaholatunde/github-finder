import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext  from './githubContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USER, GET_REPOS } from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}
const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
    repos: []
  }
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Search Users
  const searchUsers = async (text) =>  {
    setLoading();
    const response = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
    dispatch({type: SEARCH_USERS, payload: response.data.items});
  }

  const clearUsers = e => {
    dispatch({type: CLEAR_USERS});
    setLoading(false);
  }
  //Get User
  const getUser = async (userName) => {
    setLoading();
    const res = await axios.get(`https://api.github.com/users/${userName}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);
  
    dispatch({type: GET_USER, payload: res.data});
  }

  //Get Repos
  const getUserRepos = async (userName) => {
    setLoading();
    const response = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=date:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);
    dispatch({type: GET_REPOS, payload: response.data});
  }

  //Set Loading
  const setLoading = () => dispatch({type: SET_LOADING});

  return <GithubContext.Provider value={
    {
      users: state.users,
      user: state.user,
      loading: state.loading,
      repos: state.repos,
      searchUsers,
      clearUsers,
      getUser,
      getUserRepos
    }
  }>
    {props.children}
  </GithubContext.Provider>
}

export default GithubState;