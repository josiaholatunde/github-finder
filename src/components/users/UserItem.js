import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
const UserItem = ({user: {login, avatar_url, html_url}}) => {
    return (
      <div className="card text-center">
      <img 
        src={avatar_url}
        alt=''
        className="round-img"
        style={{width: '60px'}}
      />
        <h3>{login}</h3>
        <Link className="btn btn-dark btn-sm my-1" to={`/user/${login}`}>More</Link>
      </div>
    )
}
UserItem.defaultProps = {
  user: PropTypes.object.isRequired
}

export default UserItem;
