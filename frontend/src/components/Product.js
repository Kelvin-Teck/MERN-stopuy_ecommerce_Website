import {useContext} from 'react';
import {Store} from '../Store';
import data from '../data';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Rating from './Rating';

function Product({product}){
	const {state, dispatch: ctxDispatch} = useContext(Store);
	const {cart: {cartItems}} = state;

	
	const addToCartHandler = (item) => {
		const existItem = cartItems.find( x => x._id === product._id);
		const quantity = existItem ? existItem.quantity + 1 : 1; 

		if(data.products.countInStock < quantity){
			window.alert('sorry. product is out of stock');
			return;
		}

		ctxDispatch({type: 'CART_ADD_ITEM', payload: {...item, quantity}});
	}


	return (
		<Card>
  			<Link to={`/product/${product.slug}`}>
  				<img src={product.image} className="card-img-top" alt={product.name}/>
  			</Link>
  			<Card.Body>
  				<Link to={`/product/${product.slug}`}>
  					<Card.Title>{product.name}</Card.Title>
  				</Link>  
  				<Rating rating={product.rating} numReviews={product.numReviews} />				
  				<Card.Text>${product.price}</Card.Text>
  				{product.countInStock === 0 ? (<Button variant='light'>Out of Stock</Button>) : (<Button onClick={() => addToCartHandler(product)} >Add to Cart</Button>)}
  			</Card.Body>
  		</Card>
	);
}

export default Product;

