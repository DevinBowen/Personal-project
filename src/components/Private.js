import React from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/users';
import CalPrivate from './calPrivate';
import axios from 'axios';
import '../css/calandar.css'

class Private extends React.Component {

    componentDidMount() {

        axios.get('/auth/authorized').catch(error => {
            alert("test");
            this.props.history.push('/calandar') })

    }



    render() {
        // const user = this.props.user;

        return (
            <div className=''>
                <a href='/auth/logout' className="button" style={{textDecoration: "none"}}><button >LOG OUT</button></a>
                
                <CalPrivate />
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
