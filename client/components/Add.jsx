import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

const querystring = require('querystring');

class Add extends React.Component {
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
        this.insertNewBooking = this.insertNewBooking.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount = () => {
      this.setState ({
        date: [this.state.startDate, this.state.endDate]
      })
    }

    openModal = () => {
        this.setState({
          modalIsOpen: true
        });
    }

    closeModal = () => {
        this.setState({
          modalIsOpen: false,
          messageFromServer: ''
        });
    }

    onClick = (e) => {
        this.insertNewBooking(this);
    }

    onDatesChange = (dates) => {
      let start_date = dates[0];
      let end_date = dates[1];

      start_date = new Date(start_date).toISOString();
      end_date = new Date(end_date).toISOString();

      this.setState ({
        startDate: start_date,
        endDate: end_date
      });
    }

    handleTextChange = (e) => {
        if (e.target.name == "room") {
          this.setState({
            room: e.target.value
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

    insertNewBooking = (e) => {
        axios.post('/insert',
          querystring.stringify({
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
                <Button bsStyle="success" bsSize="small" onClick={this.openModal} title='Add Booking'><span className="glyphicon glyphicon-plus"></span></Button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Add Booking"
                    className="Modal">
                    <Link to={{pathname: '/'}} style={{ textDecoration: 'none' }}>
                        <span className="closebtn glyphicon glyphicon-remove" title='Close' onClick={this.closeModal}></span>
                    </Link><br/>
                    <fieldset>
                        <select type="text" className='input-field input-field-height' id="room" name="room" value={this.state.room} onChange={this.handleTextChange} required>
                            <option selected>Room</option>
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
                        <DateRangePicker
                          value={[this.state.startDate, this.state.endDate]}
                          onChange={this.onDatesChange}
                          minDate={new Date()}
                          showLeadingZeros={true}
                          className='input-field input-field-height'
                        />
                        <input type="text" className='input-contact input-field-height' id="contact" name="contact" placeholder='Contact' value={this.state.contact} onChange={this.handleTextChange} required></input>
                        <input type="number" className='input-number input-field-height' id="adults" name="adults" placeholder='Adults' value={this.state.adults} onChange={this.handleTextChange} required></input>
                        <input type="number" className='input-number input-field-height' id="children" name="children" placeholder='Children' value={this.state.children} onChange={this.handleTextChange}></input>
                        <input type="text" className='input-desc input-field-height' id="description" name="description" placeholder='Description' value={this.state.description} onChange={this.handleTextChange}></input>
                    </fieldset>
                    <div className='button-center'><br/>
                        <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Add New Booking</Button>
                    </div>
                </Modal>
            </div>
            )
        }
        else {
            return (
                <div>
                    <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
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

export default Add;