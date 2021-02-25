import React from 'react';

const Social = () => {

    return (
        <div className="ui buttons" style={{position:'absolute', bottom: '0', left: '5%'}}>
            <a href="https://www.facebook.com/erhanyaylali1/" className="ui facebook button">
                <i className="facebook icon"></i>
                Facebook
            </a>
            <a href="https://twitter.com/eran_py" className="ui twitter button">
                <i className="twitter icon"></i>
                Twitter
            </a>
            <a href="https://www.linkedin.com/in/erhanyaylali/" className="ui linkedin button">
                <i className="linkedin icon"></i>
                LinkedIn
            </a>
            <a href="https://www.instagram.com/erhanyaylali/" className="ui instagram button">
                <i className="instagram icon"></i>
                Instagram
            </a>
        </div>
    );
};

export default Social;