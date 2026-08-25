import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/user-slice';
import shoppingReducer from '../store/shpping-slice';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { ThemeProvider } from '../context/ThemeContext';

const createMockStore = (initialUserState = {}) => {
  return configureStore({
    reducer: {
      userReducer,
      shoppingReducer,
    },
    preloadedState: {
      userReducer: {
        value: 0,
        user: {},
        profile: {},
        wishlist: [],
        cart: [],
        orders: [],
        address: [],
        authPending: false,
        authError: null,
        ...initialUserState,
      },
      shoppingReducer: {
        products: [],
        categories: [],
        currentProduct: {},
      },
    },
  });
};

describe('Frontend Key Components Render Tests', () => {
  it('renders Header brand logo and navigation links', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('PORSCHE')).toBeInTheDocument();
    expect(screen.getByText('Colombia')).toBeInTheDocument();
    expect(screen.getByText('Modelos')).toBeInTheDocument();
  });

  it('renders ProductCard with vehicle info and telemetry metrics', () => {
    const store = createMockStore();
    const item = {
      _id: 'prod_911',
      name: 'Porsche 911 GT3 RS',
      desc: 'El superdeportivo de circuito por excelencia.',
      price: 223800,
      banner: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e',
      type: 'Coupe',
      available: true,
    };

    render(
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <ProductCard item={item} />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText('Porsche 911 GT3 RS')).toBeInTheDocument();
    expect(screen.getByText('$223,800')).toBeInTheDocument();
    expect(screen.getByText('Configurar')).toBeInTheDocument();
  });
});
