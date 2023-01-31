// import logo from './logo.svg';
import {BrowserRouter, Link, Routes, Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap'
import {useContext} from 'react';
import {Store} from './Store';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  



// import './App.css';
import './index.css';


function App() {

  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cart, userInfo} = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };



  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1}/>
        <header className="App-header">
            <Navbar bg="dark" variant="dark" expand="lg">
              <Container className="mt-3">
                <LinkContainer to="/">
                  <Navbar.Brand>StopBuy</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto w-100 justify-content-end">
                    <Link to="/cart" className="nav-link">
                      Cart {
                        cart.cartItems.length > 0 && (<Badge pill bg="danger">{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</Badge>)
                      }
                    </Link>
                    {userInfo ? (
                      <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>User Profile</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/orderhistory'>
                          <NavDropdown.Item>Order History</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Divider/>
                        <Link className="dropdown-item" to="#signout" onClick={signoutHandler}>Sign Out</Link>
                      </NavDropdown>
                      ) : (<Link className='nav-link' to='/signin'>Sign In</Link>)}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
        </header>
        <main>
          <Container>
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />}/>
              <Route path="/signup" element={<SignupScreen />}/>
              <Route path="/payment" element={<PaymentMethodScreen />}/>
              <Route path="/placeorder" element={<PlaceOrderScreen />}/>
              <Route path="/order/:id" element={<OrderScreen />}/>
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path="/orderhistory" element={<OrderHistoryScreen />}/>
              <Route path="/profile" element={<ProfileScreen />}/>
              <Route path="/" element={<HomeScreen />}></Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All Rights reserved.</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
