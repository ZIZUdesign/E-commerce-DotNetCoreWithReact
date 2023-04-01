import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketAsync, setBasket } from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import agent from "../api/agent";
import { getCookie } from "../util/util";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";

function App() {
  const location = useLocation();
  //const {setBasket} = useStoreContext();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

 // it makes the app to not rendering every time the app loads 
  const initApp = useCallback (async () => {
    try {
      await dispatch(fetchCurrentUser())
      await dispatch(fetchBasketAsync());
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
        .then((basket) => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(()=> setLoading(false));
    } else {
      setLoading(false); 
    }
  },[initApp, dispatch])

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


  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />

      {loading ? <LoadingComponent message="Initialising app..." />
       : location.pathname === "/" ?  <HomePage />
       : <Container>
            <Outlet />
          </Container>
      }
    </ThemeProvider>
  );
}

export default App;

// Switch component, from react-router-dom, helps the component to be mutually exclusive
