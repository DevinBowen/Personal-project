import React from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/users';
import CalPrivate from './calPrivate';

class Private extends React.Component {




    
    render() {
        const user = this.props.user;

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