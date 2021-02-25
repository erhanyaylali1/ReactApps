import React from 'react';

class ImageCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = { spans: 0 };
        this.imageRef = React.createRef();
    }

    componentDidMount(){
        this.imageRef.current.addEventListener('load',() => {
            const height = this.imageRef.current.clientHeight;
            const spans = Math.ceil(height / 10);
            this.setState({ spans: spans });
        } );
    };

    render() {

        return (
            <div style={{ gridRowEnd: `span ${this.state.spans}`}}>
                <img 
                    ref = {this.imageRef}
                    val = {this.props.value}
                    alt = {this.props.image.description}
                    src = {this.props.image.urls.regular}
                />
            </div>
        );
    };
};

export default ImageCard