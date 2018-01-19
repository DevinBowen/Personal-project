import React from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/users';
import CalPrivate from './calPrivate';
import axios from 'axios';

class Private extends React.Component {

    componentDidMount() {

        axios.get('/auth/authorized').catch(error => {this.props.history.push('/calandar') })

    }



    render() {
        // const user = this.props.user;

        return (
            <div className=''>
                <CalPrivate />
                <a href='http://localhost:5000/auth/logout'><button>Log out</button></a>
            </div>
        )
    }
}



// let decoratedComp = connect();
// export default decoratedComp();


function mapStateToProps(state) {
    return {
        user: state.user
    }
}


export default connect(mapStateToProps, { getUserInfo })(Private)