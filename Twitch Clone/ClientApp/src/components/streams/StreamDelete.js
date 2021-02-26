import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { deleteStream } from '../../actions';
import { connect } from 'react-redux';

const StreamDelete = (props) => {

    const goBack = () => {
       history.push('/');
    }

    const success = () => {
        const id = props.match.params.id;
        props.deleteStream(id);
        history.push('/');
    };

    return (
        <div>
            <Modal 
                title="Delete Stream" 
                question="Are you sure you want to delete this stream?"
                onDismiss={goBack}
                onSuccess={success}
                stream={props.stream}
            />
        </div>
    );
};

const mapStateToProps = (state, myComponent) => {
    return { stream: state.streams[myComponent.match.params.id]}
};

export default connect(mapStateToProps,{ deleteStream })(StreamDelete);