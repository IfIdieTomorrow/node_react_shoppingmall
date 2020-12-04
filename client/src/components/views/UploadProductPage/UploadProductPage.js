import React,{useState} from 'react'
import {Typography, Button, Form, Input, message} from 'antd'
import FileUpload from "../../utils/FileUpload";
import Axios from 'axios';

const {Title} = Typography;
const {TextArea} = Input;

const Continents = [
    {key : 1, value: "Africa"},
    {key : 2, value: "Europe"},
    {key : 3, value: "Asia"},
    {key : 4, value: "North America"},
    {key : 5, value: "South Amarica"},
    {key : 6, value: "Australia"},
    {key : 7, value: "Antarctica"}
]

function UploadProductPage(props) {

    const [ProductName, setProductName] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState(0);
    const [Continent, setContinent] = useState(1);
    const [Images, setImages] = useState([]);

    const nameChangeHandler = (event) => setProductName(event.currentTarget.value);
    const descriptionChangeHandler = (event) => setDescription(event.currentTarget.value);
    const priceChangeHandler = (event) => setPrice(event.currentTarget.value);
    const continentChangeHandler = (event) => setContinent(event.currentTarget.value);
    // 주의할 점은 현재 컴포넌트에서 모든 정보를 DB에 보내야 하고, 이미지 관련 정보는 FileUpload 컴포넌트가
    // 가지고 있으므로 FileUpload컴포넌트에서 이미지 정보를 받아와야 한다.
    const updateImages = (newImages) => setImages(newImages);

    const submitHandler = (event) => {
        event.preventDefault();

        if(!Title || !Description || !Price || !Continent || !Images){
            return alert("모든 값을 넣어주셔야 합니다.")
        }

        // 서버에 채운 값을들 request로 보낸다.
        const body = {
            //로그인 된 사람의 ID
            writer : props.user.userData._id,
            title : ProductName,
            description : Description,
            price : Price,
            images : Images,
            continents : Continent
        }

        Axios.post("/api/product/", body)
        .then(response => {
            if(response.data.success){
                message.success("상품 업로드에 성공 했습니다.");
                setTimeout(() => {
                    props.history.push("/");
                }, 2000);
            } else {
                alert("상품 업로드에 실패 했습니다.")
            }
        })

    }
    
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
             <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                 <Title level={2}>여행 상품 업로드</Title>
             </div>

             <Form onSubmit={submitHandler}>

                {/* DropZone */}

                <FileUpload refreshFunction={updateImages}/>

                <br />
                <br />
                <label>이름</label>
                <Input value={ProductName} onChange={nameChangeHandler}/>
                <br />
                <br />
                <label>설명</label>
                <TextArea value={Description} onChange={descriptionChangeHandler}/>
                <br />
                <br />
                <label>가격($)</label>
                <Input value={Price} onChange={priceChangeHandler} type="number"/>
                <br />
                <br />
                <select onChange={continentChangeHandler} value={Continent}>
                    {Continents.map((item)=>(
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>

                <br />
                <br />
                <Button onClick={submitHandler}> 
                    확인
                </Button>

             </Form>
        </div>
    )
}

export default UploadProductPage
