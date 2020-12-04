import React,{useState} from 'react'
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from 'axios';

function FileUpload(props) {

    const [Images, setImages] = useState([]);

    const dropHandler = (files) => {
        // 파일 전송시에는 밑과 같은 과정이 필요하다.
        let formData = new FormData();

        const config = {
            header : {'content-type' : 'multipart/form-data'}
        }
        formData.append("file", files[0]);

        // 이미지 등록
        Axios.post("/api/product/image", formData, config)
        .then(response => {
            if(response.data.success) { 
                setImages([...Images,response.data.filePath]);
                props.refreshFunction([...Images,response.data.filePath])
            } else {
                alert("상품 이미지 등록에 실패했습니다!");
            }
        })
    }

    // 이미지 삭제
    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image)
        
        let newImages = [...Images]
        newImages.splice(currentIndex, 1)
        setImages(newImages);
        props.refreshFunction(newImages);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps})=>(
                    <section>
                        <div style={{ width: 300, height: 240, border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize:'3rem' }} />
                        </div>
                    </section>  
                )}
            </Dropzone>

            <div className="box" style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
                    {Images.map((image, index)=>(
                        <div onClick={() => deleteHandler(image)} key={index}>
                            <img style={{ minWidth: '300px', width: '300px',height: '240px' }}    
                                src={`http://localhost:5000/${image}`}
                            />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default FileUpload
