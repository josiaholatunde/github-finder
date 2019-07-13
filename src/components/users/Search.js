import React, { Component } from 'react'
import PropTypes from 'prop-types';
export class Search extends Component {
  state = {
    text: ''
  }
  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClearBtn: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  }
  handleChange = ({target: {name, value}}) => this.setState({[name]: value});
  handleSubmit = e => {
    e.preventDefault();
    const {text} = this.state;
    if (!text) {
      this.props.setAlert('Please enter something to search', 'light');
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({text: ''});
    } 
  }
  render() {
    const {text} = this.state;
    const {showClearBtn, clearUsers} = this.props;
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
        <input type="text" name="text" id="text" placeholder="Search Users..." value={text} onChange={this.handleChange}/>
        <input type="submit" name="text" value="Search" className="btn btn-dark btn-block"/>
        {showClearBtn && <input type="button" name="text" value="Clear" className="btn btn-light btn-block" onClick={() => clearUsers()} />}
        </form>
      </div>
    )
  }
}

export default Search;
