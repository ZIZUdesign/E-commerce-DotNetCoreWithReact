import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import LoadingComponent from "./LoadingComponent";
import { CheckoutPage } from "../../features/checkout/CheckoutPage";
import { useAppDispatch } from "../store/configureStore";
import { fetchBaksetAsync, setBasket } from "../../features/basket/basketSlice";
import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import { useEventCallback } from "@material-ui/core";
import agent from "../api/agent";
import { getCookie } from "../util/util";

function App() {
  //const {setBasket} = useStoreContext();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

 // it makes the app to not rendering every time the app loads 
  const initApp = useCallback (async () => {
    try {
      await dispatch(fetchCurrentUser())
      await dispatch(fetchBaksetAsync());
    } catch(error){
      console.log(error);
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
    const buyerId = getCookie('buyerId');
    dispatch(fetchCurrentUser());
    if (buyerId){
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(()=> setLoading(false));
    } else {
      setLoading(false); 
    }
  },[initApp])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message='Initialising app...' /> 

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Switch> 
          <Route exact path='/' component={HomePage} />
          <Route exact path='/catalog' component={Catalog} />
          <Route path='/catalog/:id' component={ProductDetails} />
          <Route path='/about' component={AboutPage} />
          <Route path='/contact' component={ContactPage} />
          <Route path='/server-error' component={ServerError} />
          <Route path='/basket' component={BasketPage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />

          <Route component={NotFound} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;

// Switch component, from react-router-dom, helps the component to be mutually exclusive
