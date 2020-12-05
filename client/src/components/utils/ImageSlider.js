import React, {useEffect} from 'react'
import {Carousel} from 'antd'

function ImageSlider(props) {

    return (
        <div>
            <Carousel autoplay>
                {props.image.map((image, index)=>(
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '150px' }} 
                            src={`http://localhost:5000/${image}`}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
