import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add.jsx';
import Update from './Update.jsx';
import Delete from './Delete.jsx';
import moment from 'moment';
import $ from 'jquery';
import '../css/App.css';

class App extends Component {
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

  getData = (ev) => {
    axios.get('/getAll')
      .then(function(response) {
        ev.setState({data: response.data});
      });
  }

  render() {
    $(document).ready(function () {
      let sortOrder;

      $('th').each(function (col) {
          $(this).click(function () {
              if (sortOrder === 1) {
                  $(this).removeClass('asc');
                  $(this).addClass('desc selected');
                  sortOrder = -1;
              } else {
                  $(this).addClass('asc selected');
                  $(this).removeClass('desc');
                  sortOrder = 1;
              }
              $(this).siblings().removeClass('asc selected');
              $(this).siblings().removeClass('desc selected');
              let arrData = $('table').find('tbody >tr:has(td)').get();
              arrData.sort(function (a, b) {
                  let val1 = $(a).children('td').eq(col).text().toUpperCase();
                  let val2 = $(b).children('td').eq(col).text().toUpperCase();

                  if ($.isNumeric(val1) && $.isNumeric(val2)) {
                      return sortOrder == 1 ? val1 - val2 : val2 - val1;
                  } else {
                      return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
                  }
              });
              $.each(arrData, function (index, row) {
                  $('tbody').append(row);
              });
          });
      });
    });

    return (
      <div style={{margin: '10px'}}>
        <Add />
        <br/>
        <table>
          <thead>
            <tr>
              <th>
                <span className='glyphicon glyphicon-info-sign info-sign' title='Click on column headers to sort'></span>
              </th>
              <th className='button-col'>Room</th>
              <th className='button-col'>Start Date</th>
              <th className='button-col'>End Date</th>
              <th className='button-col'>Contact</th>
              <th className='button-col'>Adults</th>
              <th className='button-col'>Children</th>
              <th className='button-col'>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map(function(booking){
                let startDate = booking.startDate;
                let endDate = booking.endDate;

                startDate = moment(startDate).format('YYYY MMM Do'); //  Used YYYY MMM Do for right sorting, else use Do MMM YYYY
                endDate = moment(endDate).format('YYYY MMM Do');

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

export default App;

