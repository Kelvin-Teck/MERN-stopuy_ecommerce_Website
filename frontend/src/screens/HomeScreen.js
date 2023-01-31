import {useEffect, useReducer} from 'react';
import logger from 'use-reducer-logger';
import {Helmet} from 'react-helmet-async';
import axios from 'axios';
// import data from '../data';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {baseUrl} from '../utils';


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
				const result = await axios.get(`${baseUrl}api/products`);
				// console.log(result.data)
				dispatch({type: 'FETCH_SUCCESS', payload: result.data});
			}catch(err){
				dispatch({type: 'FETCH_FAIL', payload: err.message});
			}
		}

		fetchData();
		// dispatch({type: 'FETCH_REQUEST'});

		// dispatch({type: 'FETCH_SUCCESS', payload: data.products});

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

// npm i bcryptjs express-async-handler mailgun-js jsonwebtoken cloudinary multer streamifier