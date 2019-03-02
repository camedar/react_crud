import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';
import Modal from '../Modal';
import history from '../../history';

class StreamDelete extends React.Component {
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions() {
        const { id } = this.props.match.params;
        return (
            <React.Fragment>
                <button 
                onClick={() => this.props.deleteStream(id) }
                className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        let message = 'Are you sure you want to delete this stream?';
        if(!this.props.stream) {
            return message;
        }
        else {
            return message.replace('stream', 'this stream with title: "' + this.props.stream.title + '"');
        }
    }

    render() {
        console.log(this.props);
        return (
            <Modal
                title="Delete Stream"
                content={ this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        )
    }
};

const mapStateToProps = (state,ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]};
};

export default connect( mapStateToProps, {
    fetchStream,
    deleteStream
})(StreamDelete);