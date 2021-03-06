import React from 'react';
import { connect } from 'react-redux';
import { getStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends React.Component {

    componentDidMount() {
        this.props.getStreams();
    }

    renderButtons = (stream) => {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary"> Edit </Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative"> Delete </Link>
                </div>
            );
        };
    };
    
    renderList = () => {
        return this.props.streams.map(stream => {
            return (
                <div className="item py-3" key={stream.id}>
                    {this.renderButtons(stream)}
                        <i className="large middle aligned icon camera" />
                        <div className="content">
                            <Link to={`/streams/${stream.id}`} className="header">
                            {stream.streamTitle}
                            </Link>
                            <div className="description" >
                                {stream.streamDescription}
                            </div>
                        </div>
                </div>
            );
        });
    };

    renderCreate = () => {
        if(this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right', marginTop: '30px' }}>
                    <Link to="/streams/new" className="ui button blue">Create</Link>
                </div>
            );
        };
    };

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams), 
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSigned
    }
}

export default connect(mapStateToProps, {getStreams})(StreamList);