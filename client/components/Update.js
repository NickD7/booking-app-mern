import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';

const querystring = require('querystring');

class Update extends React.Component {
    constructor() {
        super();

        this.state = {
            room: '',
            startDate: '',
            endDate: '',
            contact: '',
            adults: '',
            children: '',
            description: '',
            messageFromServer: '',
            modalIsOpen: false
        };

        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.updateBooking = this.updateBooking.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.setState({
          id: this.props.booking._id,
          room: this.props.booking.room,
          startDate: this.props.booking.startDate,
          endDate: this.props.booking.endDate,
          contact: this.props.booking.contact,
          adults: this.props.booking.adults,
          adults: this.props.booking.adults,
          children: this.props.booking.children,
          description: this.props.booking.description
        });
    }

    openModal() {
        this.setState({
          modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
          modalIsOpen: false,
          messageFromServer: ''
        });
    }

    onClick(e) {
        this.updateBooking(this);
    }

    handleTextChange(e) {
        if (e.target.name == "room") {
          this.setState({
            room: e.target.value
          });
        };

        if (e.target.name == "startDate") {
          this.setState({
            startDate: e.target.value
          });
        };

        if (e.target.name == "endDate") {
          this.setState({
            endDate: e.target.value
          });
        };

        if (e.target.name == "contact") {
          this.setState({
            contact: e.target.value
          });
        };

        if (e.target.name == "adults") {
          this.setState({
            adults: e.target.value
          });
        };

        if (e.target.name == "children") {
          this.setState({
            children: e.target.value
          });
        };

        if (e.target.name == "description") {
          this.setState({
            description: e.target.value
          });
        };
    }

    updateBooking(e) {
        axios.post('/update',
          querystring.stringify({
            _id: e.state.id,
            room: e.state.room,
            startDate: e.state.startDate,
            endDate: e.state.endDate,
            contact: e.state.contact,
            adults: e.state.adults,
            children: e.state.children,
            description: e.state.description,
          }), {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }).then(function(response) {
                e.setState({
                  messageFromServer: response.data
                });
            });
    }

    render() {
        if (this.state.messageFromServer == '') {
            return (
              <div>
                <Link style={{ textDecoration: 'none' }}>
                    <span className="glyphicon glyphicon-edit" title='Edit Booking' onClick={this.openModal}></span>
                </Link>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Add Booking"
                    className="Modal">
                    <Link to={{pathname: '/'}} style={{ textDecoration: 'none' }}>
                        <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
                    </Link><br/>
                    <fieldset>
                        <label for="room">Room:</label>
                           <select type="text" className='input-field' id="room" name="room" value={this.state.room} onChange={this.handleTextChange} required>
                               <option>Select</option>
                               <option value="Apartment (303)" id="Apartment303">Apartment (303)</option>
                               <option value="Apartment (205)" id="Apartment205">Apartment (205)</option>
                               <option value="Quadruple (301)" id="Quadruple301">Quadruple (301)</option>
                               <option value="Triple (302)" id="Triple302">Triple (302)</option>
                               <option value="Triple (201)" id="Triple201">Triple (201)</option>
                               <option value="Triple (204)" id="Triple204">Triple (204)</option>
                               <option value="Double (202)" id="Double202">Double (202)</option>
                               <option value="Double (203)" id="Double203">Double (203)</option>
                               <option value="Twin (102)" id="Twin102">Twin (102)</option>
                               <option value="Twin (103)" id="Twin103">Twin (103)</option>
                           </select>
                        <label for="startDate">Start Date:</label><input type="date" className='input-field' id="startDate" name="startDate" value={this.state.startDate} onChange={this.handleTextChange} required></input>
                        <label for="endDate">End Date:</label><input type="date" className='input-field' id="endDate" name="endDate" value={this.state.endDate} onChange={this.handleTextChange} required></input>
                        <label for="contact">Contact:</label><input type="text" className='input-field' id="contact" name="contact" value={this.state.contact} onChange={this.handleTextChange} required></input>
                        <label for="adults">Adults:</label><input type="number" className='input-field' id="adults" name="adults" value={this.state.adults} onChange={this.handleTextChange} required></input>
                        <label for="children">Children:</label><input type="number" className='input-field' id="children" name="children" value={this.state.children} onChange={this.handleTextChange}></input>
                        <label for="description">Description:</label><input type="text" className='input-field' id="description" name="description" value={this.state.description} onChange={this.handleTextChange}></input>
                    </fieldset>
                    <div className='button-center'><br/>
                        <Button bsStyle="warning" bsSize="small" onClick={this.onClick}>Update Booking</Button>
                    </div>
                </Modal>
            </div>
            )
        }
        else {
            return (
                <div>
                    <Button bsStyle="warning" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-edit"></span></Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Booking"
                        className="Modal">
                        <div className='button-center'>
                            <h3>{this.state.messageFromServer}</h3>
                            <Link to={{pathname: '/'}} style={{ textDecoration: 'none' }}>
                                <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Close the Dialog</Button>
                            </Link>
                        </div>
                    </Modal>
                </div>
           )
        }
    }
}

export default Update;