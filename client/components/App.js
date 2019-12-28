import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import moment from 'moment';
import '../css/App.css';

export default class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      data: []
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData(this);
  }

  componentWillReceiveProps(nextProps) {
    this.getData(this);
  }

  getData(ev) {
    axios.get('/getAll')
      .then(function(response) {
        ev.setState({data: response.data});
      });
  }

  render() {
    return (
      <div style={{margin: '10px'}}>
        <Add />
        <br/>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className='button-col'>Room</th>
              <th className='button-col'>Start Date</th>
              <th className='button-col'>End Date</th>
              <th className='button-col'>Contact</th>
              <th className='button-col'>Adults</th>
              <th className='button-col'>Children</th>
              <th className='button-col'>Description</th>
              {/* <th className='edit-col'>Edit</th>
              <th className='edit-col'>Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map(function(booking){
                let startDate = booking.startDate;
                let endDate = booking.endDate;

                startDate = moment(startDate).format('Do MMM YYYY');
                endDate = moment(endDate).format('Do MMM YYYY');

                return <tr>
                  <td className='counterCell'></td>
                  <td className='button-col text-bold'>{booking.room}</td>
                  <td className='button-col'>{startDate}</td>
                  <td className='button-col'>{endDate}</td>
                  <td className='button-col'>{booking.contact}</td>
                  <td className='button-col'>{booking.adults}</td>
                  <td className='button-col'>{booking.children}</td>
                  <td className='button-col'>{booking.description}</td>
                  <td className='edit-col'><Update booking={booking} /></td>
                  <td className='edit-col'><Delete id={booking._id} booking={booking} /></td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

