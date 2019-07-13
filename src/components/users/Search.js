import React, {  useState, useContext } from 'react'
import GithubContext  from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';
const Search = ({showClearBtn } ) => {
  const [text, setText] = useState('');
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const {setAlert} = alertContext;
  const {searchUsers, clearUsers, users} = githubContext;

  const handleChange = ({target: { value}}) => setText(value);
  const handleSubmit = e => {
    e.preventDefault();

    if (!text) {
      setAlert('Please enter something to search', 'light');
    } else {
      searchUsers(text);
      setText('');
    } 
  }
    return (
      <div>
        <form className="form" onSubmit={handleSubmit}>
        <input type="text" name="text" id="text" placeholder="Search Users..." value={text} onChange={handleChange}/>
        <input type="submit" name="text" value="Search" className="btn btn-dark btn-block"/>
        {users.length > 0 && <input type="button" name="text" value="Clear" className="btn btn-light btn-block" onClick={() => clearUsers()} />}
        </form>
      </div>
    )
  }

export default Search;
