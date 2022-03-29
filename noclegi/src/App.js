import React, { useEffect, useReducer, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Hotels from './components/Hotels/Hotels';
import LoadingIcon from './components/UI/LoadingIcon/LoadingIcon';
import Searchbar from './components/UI/LoadingIcon/Searchbar/Searchbar';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import ThemeButton from './components/UI/LoadingIcon/ThemeButton/ThemeButton';
import ThemeContext from './context/ThemeContext';
import AuthContext from './context/authContext';


const backendHotels = [
  {
    id: 1,
    name: "Pod akacjami",
    city: "Warszawa",
    rating: 8.3,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id metus orci. Nam quis sapien faucibus, sodales elit nec, malesuada enim.',
    image: ''
  },
  {
    id: 2,
    name: "Dębowy",
    city: "Lublin",
    rating: 9.1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id metus orci. Nam quis sapien faucibus, sodales elit nec, malesuada enim.',
    image: ''
  },
]


const reducer = (state, action) => {
  switch (action.type) {
    case 'change-theme':
      return {
        ...state,
        theme: state.theme === 'warning' ? 'primary' : 'warning'
      };
    case 'set-hotels':
      return { ...state, hotels: action.hotels };
    case 'set-loading':
      return { ...state, loading: action.loading };
    case 'set-isauthenticated':
      return { ...state, isAuthenticated: action.isAuthenticated };
    default:
      throw new Error('Nie ma takiej akcji', action.type);
  }
}

const initialState = {
  hotels: [],
  loading: true,
  isAuthenticated: false,
  theme: 'primary'
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const changeTheme = () => {
    dispatch({ type: 'change-theme' });

  }

  const searchHandler = term => {
    const newHotels = [...backendHotels]
      .filter(x => x.name
        .toLowerCase()
        .includes(term.toLowerCase()));
    // setHotels(newHotels);
    dispatch({ type: 'set-hotels', hotels: newHotels });
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'set-hotels', hotels: backendHotels });
      dispatch({ type: 'set-loading', loading: false });
    }, 1000);
  }, []);


  const header = (
    <Header>
      <Searchbar onSearch={term => searchHandler(term)}></Searchbar>
      <ThemeButton></ThemeButton>
    </Header>
  );

  const content = (
    state.loading
      ? <LoadingIcon ></LoadingIcon>
      : <Hotels hotels={state.hotels} ></Hotels>
  );

  const menu = <Menu ></Menu>;
  const footer = <Footer></Footer>;

  return (
    <AuthContext.Provider value={{
      isAuthenticated: state.isAuthenticated,
      login: () => dispatch({ type: 'set-isauthenticated', isAuthenticated: true }),
      logout: () => dispatch({ type: 'set-isauthenticated', isAuthenticated: false }),

    }}>
      <ThemeContext.Provider value={{
        color: state.theme,
        changeTheme: changeTheme
      }}>

        <Layout
          header={header}
          menu={menu}
          content={content}
          footer={footer}
        />
      </ThemeContext.Provider>
    </AuthContext.Provider>

  );
}

export default App;
