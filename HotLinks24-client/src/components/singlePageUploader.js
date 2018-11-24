import React, {Component} from 'react';

export const SingleImageUploader = (props) => {
    return (
        <div className='single-image-uploader'>
            <p>Picture must be maximum of 360 x 360 pixel and 35 KB size</p>
            <input
                type='file'
                onChange={props.onFileUpload}
                accept="image/png, image/jpeg"
            />
            {props.sizeError && <p className='size-error'>{props.sizeError}</p>}
        </div>
    );
}