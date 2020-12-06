import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import { Icon, Col, Card, Row, Button } from 'antd'
import Meta from 'antd/lib/card/Meta';
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import SearchFeature from "./Sections/SearchFeature";
import {continents, price} from "./Sections/Datas";

function LandingPage(props) {
    
    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(8);
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        continents : [],
        price : []
    })
    const [SearchTerm, setSearchTerm] = useState("");
    
    // 페이지가 렌더링 되면서 getProducts함수를 호출
    useEffect(() => {
        let body = {
            skip : Skip,
            limit : Limit
        }
        getProducts(body);
    }, [])

    // 이 부분이 모든 상품 정보를 가져오는곳.(filter를 이용해서 원하는 상품정보만 가져올 수 있음)
    const getProducts = (body) => {
        axios.post("/api/product/products", body)
        .then(response => {
            if(response.data.success) { 
                if(body.loadMore) {
                    setProducts([...Products,...response.data.productInfo])
                } else {
                    setProducts(response.data.productInfo)
                }
                setPostSize(response.data.postSize)
            } else {
                alert("상품 정보를 가져오지 못했습니다.")
            }
        })
    }

    // 더 보기 버튼을 누르고 남은 상품이 더 있을경우 남은 상품을 불러옴 
    const loadMoreHandler = () => {
        let skip = Skip + Limit;
        let body = {
            skip : skip,
            limit : Limit,
            loadMore : true
        }
        getProducts(body)
        setSkip(skip);
    }

    
    // 필터로 조건을 정한 결과
    const showFilteredResults = (filters) => {
        let body = {
            skip : 0,
            limit : Limit,
            filters : filters
        }
        getProducts(body)
        setSkip(0);
    }
    
    const handlePrice = (value) => {
        const data = price;
        let array = [];
        for(let key in data) {
            if(data[key]._id === parseInt(value, 10)) { 
                array = data[key].array;
            }
        }
        return array;
    }

    // 여기서 조건에 맞는 필터룰 구함
    const handleFilters = (filters, category) => {
        const newFilters = {...Filters}
        newFilters[category] = filters
        if(category === "price") {
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }
        showFilteredResults(newFilters)
        setFilters(newFilters);
    }
    
    // 자식 컴포넌트인 SearchFeature에서 받은 search값을 부모 컴포넌트로 업데이트 하면서
    // 검색을 동시에 진행
    const updateSearchTerm = (newSearchTerm) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }
        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body);
    }

    // 카드 이미지를 위한 함수
    const renderCards = Products.map((product, index)=>{
        return <Col key={index} lg={6} md={8} xs={24}>
            <Card 
                cover={<a href={`/product/${product._id}`}><ImageSlider image={product.images}/></a>}
            >
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
        </Col>
    });
    
    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }} >
                <h2> 원하는 곳으로 여행을 떠나요! <Icon type="rocket" /></h2>
            </div>

            {/* 필터 */}
            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    {/* 체크박스 */}
                    <CheckBox list={continents} handleFilters={filters => handleFilters(filters,"continents")} />
                </Col>
                <Col lg={12} xs={24}>
                    {/* 라디오박스 */}
                    <RadioBox list={price} handleFilters={filters => handleFilters(filters,"price")} />
                </Col>
            </Row>

            {/* 검색 */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <SearchFeature 
                    refreshFunction={updateSearchTerm}
                />
            </div>

            {/* 카드 */}
            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>

            <br />
            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={loadMoreHandler}>더보기</Button>
                </div>
            }
        </div>
    )
}

export default LandingPage
