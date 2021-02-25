import React from 'react';
import ImageCard from './ImageCard'
import './ImageList.css';


const ImageList = (props) => {

    const images = props.images.map((img, index) => {
        return <ImageCard key={img.id} value={index} image={img} />
    });

    return (
        <div className="ImageList"> 
            {images}
        </div>
    );
};

export default ImageList