import React from 'react';
import {connect} from 'react-redux';
import {signIn,signOut} from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1070103398727-jmg2d81q2g6cmanb6ej87h0mlmnv0ovo.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
        
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButon(){
        if(this.props.isSignedIn === null){
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <button className="ui red google button" onClick={
                    this.onSignOutClick
                }>
                    <i className="google icon" />
                    Sign out
                </button>
            );
        } else {
            return (
                <button className="ui green google button" 
                    onClick={this.onSignInClick}>
                    <i className="google icon"/>
                    Sign in with Google
                </button>
            );
        }
    }

    render(){
        return (
            <div>{ this.renderAuthButon()}</div>
        );
    }
};

const mapStateToProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
}

export default connect( mapStateToProps, 
    {
        signOut,signIn
    })(GoogleAuth);