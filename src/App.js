import React, { Component } from 'react';
import * as ContactsAPI from './utils/ContactsAPI';

import ListContacts from './ListContacts';
import CreateContact from './CreateContact';


class App extends Component {
    state = {
        contacts: [],
        screen: 'list'
    }

    componentDidMount() {
        ContactsAPI.getAll()
            .then((contacts) => {
                this.setState(() => ({
                    contacts
                }))
            })
    }

    removeContact = (contact) => {
        // Callback/functional state
        this.setState((currentState) => ({
            contacts: currentState.contacts.filter((c) => {
                return c.id !== contact.id
            })
        }))

        ContactsAPI.remove(contact);
    }
    
    render () {
        return (
            <div className="App">
                {this.state.screen === 'list' && (
                    <ListContacts 
                        contacts={this.state.contacts} 
                        onDeleteContact={this.removeContact}
                        onNavigate={() => {
                            this.setState(() => ({
                                screen: 'create'
                            }))
                        }}
                    />
                )}
                
                {this.state.screen === 'create' && (
                    <CreateContact />
                )}
            </div>
        );
    }
}

export default App;
