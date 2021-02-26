import React from 'react';
import { connect } from 'react-redux';
import { getStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends React.Component{

    componentDidMount = () => {
        this.props.getStream(this.props.match.params.id);
    };

    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

    renderHelper = () => {
        if(this.props.stream) {
            if(this.props.user.userId === this.props.stream.userId){
                if (this.props.stream) {
                    return (
                        <StreamForm 
                            initialValues = {_.pick(this.props.stream,'streamTitle','streamDescription')}
                            onSubmit={this.onSubmit} 
                        />
                    );
                };
            }
        };
    };
    
    render() {
        return (
            <div>
                {this.renderHelper()}
            </div>
        );
    }
    
};



const mapStateToProps = (state, myComponent) => {
    return { stream: state.streams[myComponent.match.params.id], user: state.auth };
};

export default connect(mapStateToProps,{ getStream, editStream })(StreamEdit);