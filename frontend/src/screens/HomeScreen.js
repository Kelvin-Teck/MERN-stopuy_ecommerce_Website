import {useEffect, useReducer} from 'react';
import logger from 'use-reducer-logger';
import {Helmet} from 'react-helmet-async';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import {baseUrl} from '../utils';


const reducer = (state, action) => {
	switch(action.type){
		case 'FETCH_REQUEST':
			return {...state, loading: true};
		case 'FETCH_SUCCESS':
			return {...state, products: action.payload, loading: false};
		case 'FETCH_FAIL':
			return {...state, loading:false, error: action.payload};
		default:
			return state;
	}
}



function HomeScreen(){
	
	const [{loading, error, products}, dispatch] = useReducer(logger(reducer), {
		products: [],
		loading: true,
		error: ''
	});

	useEffect(() => {
		const fetchData = async () =>{
			try{
				dispatch({type: 'FETCH_REQUEST'});
				const result = await axios.get(`/api/products`);
				dispatch({type: 'FETCH_SUCCESS', payload: result.data});
			}catch(err){
				dispatch({type: 'FETCH_FAIL', payload: err.message});
			}
		}

		fetchData();

	}, []);
	
	return (
		<div>
			<Helmet><title>Cartwell</title></Helmet>
			<h1>Featured Products</h1>
          	<div className="products">
	            {
	              loading ? (
	              		<LoadingBox /> 
	              ): error ? ( 
	              		<MessageBox variant="danger">{error}</MessageBox>
	              ) : (
	              	<Row>
	               {
	               	products.map( product => (
	               		<Col>
	               			<Product product={product} key={product._id}/>
	               		</Col>
	               	))
	          		}
	          	  </Row>
	          	 )
	            }
          	</div>
        </div>
	)
}

export default HomeScreen;


