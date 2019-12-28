import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Delete extends React.Component {
    constructor() {
        super();

        this.state = {
              id:''
        };

        this.onClick = this.onClick.bind(this);
        this.deleteBooking = this.deleteBooking.bind(this);
    }

    componentDidMount() {
        this.setState({
            id: this.props.booking._id
        })
    }

    onClick(e) {
        this.deleteBooking(this);
    }

    deleteBooking(e){
        axios.get('/delete?id=' + e.state.id);
    }

    render() {
        return (
            <Link to={{pathname: '/'}} style={{ textDecoration: 'none' }}>
                <span className="glyphicon glyphicon-trash" title='Delete Booking' onClick={this.onClick}></span>
            </Link>
        )
    }
}

export default Delete;