import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '811904560300-tlbg2b9e55cd3st0i7p8u856bes8g9jg.apps.googleusercontent.com',
                scope: 'email'
            }).then((response) => {
                this.auth = window.gapi.auth2.getAuthInstance();
                if(this.auth.isSignedIn.get()){
                    this.props.signIn(this.auth.currentUser.get().getId());
                } else {
                    this.props.signOut();
                }
            });
        });
    };



    signInClick = async () => {
        await this.auth.signIn();
        this.props.signIn(this.auth.currentUser.get().getId());
    }

    signOutClick = async() => {
        await this.auth.signOut();
        this.props.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null
        } else if (this.props.isSignedIn) {
            return <button 
                        className="ui google button red" 
                        onClick={() => this.signOutClick()}
                    >
                        <i className="google icon" />
                        Log Out
                    </button>
        } else {
            return <button 
                        className="ui google button red"  
                        onClick={() => this.signInClick()}
                    >
                        <i className="google icon" />
                        Log In
                    </button>
        }
    }

    render () {

        return (
            <div>
                {this.renderAuthButton()}                
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSigned }
}
export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);