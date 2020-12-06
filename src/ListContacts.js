import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onContactRemove: PropTypes.func.isRequired
  }
  state = {
    query: ''
  }
  updateQuery = (query) => {
    this.setState(() => ({ query: query.trim() }))
  }
  resetQuery = () => {
    this.updateQuery('')
  }
  render() {
    const { query } = this.state
    const { contacts, onContactRemove } = this.props

    const filteredContacts = query === '' ?
        contacts : contacts.filter(contact => contact.name.toLowerCase().includes(query.toLowerCase()))
    return (
        <div className='list-contacts'>
          <div className='list-contacts-top'>
            <input
                className='search-contacts'
                type='text'
                placeholder='Search contacts'
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)} />
            <Link
                to='/create'
                className='add-contact'
            >Add Contact</Link>
          </div>
          {filteredContacts.length !== contacts.length && (
              <div className='showing-contacts'>
                <p>Now showing {filteredContacts.length} of {contacts.length}.</p>
                <button onClick={this.resetQuery}>Show all</button>
              </div>
          )}
          <ol className='contact-list'>
            {filteredContacts.map(contact => <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{ backgroundImage: `url(${contact.avatarURL}`}}></div>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button onClick={() => onContactRemove(contact)} className='contact-remove'>
                Remove
              </button>
            </li>)}
          </ol>
        </div>
    )
  }
}

export default ListContacts
