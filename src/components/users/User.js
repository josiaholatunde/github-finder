import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom'
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import Repos from '../repos/Repos';
export class User extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
  }
  componentDidMount() {
    console.log(this.props.match);
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }
  render() {
    const  { name, avatar_url, bio, company, blog, login, location, html_url, followers, following, public_repos, public_gists, hireable} = this.props.user;
    const {loading, repos} = this.props;
    if (loading) {
      return <Spinner />
    }
    return (
      <Fragment>
        <Link to='/' className="btn btn-light" >Back to Search</Link>
        Hireable: {' '}
        {hireable ?  (<i className="fa fa-check text-success"></i>) : (
          <i className="fa fa-times-circle text-danger"></i>
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img src={avatar_url} alt="" className="rounded-img" style={{width: '150px'}}/>
            <h1>{name}</h1>
            <p> {location} </p>
          </div>
          <div>
            {bio && (<Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>) }
              <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
              <ul>
                <li>{login && (
                  <Fragment>
                    <strong>Username:</strong>{login}
                  </Fragment>
                )}</li>

                <li>{company && (
                  <Fragment>
                    <strong>Company:</strong>{company}
                  </Fragment>
                )}</li>
                <li>{blog && (
                  <Fragment>
                    <strong>Website:</strong>{blog}
                  </Fragment>
                )}</li>
              </ul>
          </div>
        </div>
        <div className="card text-center">
            <div className="badge badge-primary"> Followers: {followers}</div>
            <div className="badge badge-success"> Following: {following}</div>
            <div className="badge badge-danger"> Public Repos: {public_repos}</div>
            <div className="badge badge-dark"> Public Gists: {public_gists}</div>
        </div>
        <Repos repos={repos}/>
        <p>{name}</p>
      </Fragment>
    )
  }
}

export default User;
