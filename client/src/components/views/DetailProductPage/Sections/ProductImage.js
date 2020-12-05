import React,{useEffect,useState} from 'react'
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {

    const [Images, setImages] = useState([]);

    useEffect(() => {
        if(props.detail.images && props.detail.images.length > 0) {
            let images = []

            props.detail.images.map(item => {
                images.push({
                    original: `http://localhost:5000/${item}`,
                    thumbnail: `http://localhost:5000/${item}`
                })
            })
            setImages(images);
        }
    }, [props.detail])
    // useEffect함수의 마지막 배열의 인풋값의 의미는.
    // 배열안에 들어간 값이 바뀔 때 마다 한번 더 라이프사이클을 실행하라는 의미이다.

    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default ProductImage
