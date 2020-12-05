import Axios from 'axios'
import React,{useEffect,useState} from 'react'
import ProductInfo from "./Sections/ProductInfo";
import ProductImage from "./Sections/ProductImage";
import {Row, Col} from 'antd';

function DetailProductPage(props) {

    const productId = props.match.params.productId;

    const [Product, setProduct] = useState({});

    useEffect(() => {
        Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
        .then(response => {
            if(response.data.success) {
                console.log(response.data);
                setProduct(response.data.product[0]);
            } else {
                alert("상품의 상세정보를 가져오지 못했습니다.")
            }
        })
    }, [])

    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.title}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]}>
                <Col lg={12} sm={24}>
                    {/* 상품 이미지 */}
                    <ProductImage detail={Product}/>
                </Col>
                <Col lg={12} sm={24}>
                    {/* 상품 정보 */}
                    <ProductInfo detail={Product}/>
                </Col>
            </Row>

            

            

        </div>
    )
}

export default DetailProductPage
