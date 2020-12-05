import React from 'react'
import { Descriptions, Button } from 'antd'

function ProductInfo(props) {

    const clickHandler = () => {
        
    }

    return (
        <div>
            <Descriptions title="상품 정보" bordered style={{ marginTop: '5rem' }}>
                <Descriptions.Item label="금액">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="수량">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="조회수">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="내용">{props.detail.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />            
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    장바구니 담기
                </Button>
            </div>
        </div>
    )
}

export default ProductInfo
