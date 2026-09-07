import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/user-slice';
import shoppingReducer from '../store/shpping-slice';
import { CreateProduct } from '../components/CreateProduct';
import { ThemeProvider } from '../context/ThemeContext';

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

const createMockStore = (initialUserState = {}) => {
  return configureStore({
    reducer: {
      userReducer,
      shoppingReducer,
    },
    preloadedState: {
      userReducer: {
        value: 0,
        user: { token: 'mock_jwt_token' },
        profile: { email: 'admin@porsche.co' },
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

describe('CreateProduct Component Tests', () => {
  it('renders all required form inputs and Porsche design elements', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <CreateProduct />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/ALTA DE NUEVO VEHÍCULO/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ej. Porsche 911 GT3 RS/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('223800')).toBeInTheDocument();
    expect(screen.getByText(/Disponibilidad Inmediata/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Publicar Vehículo en Inventario/i })).toBeInTheDocument();
  });

  it('populates form fields when clicking a Porsche preset template', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <CreateProduct />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );

    const presetBtn = screen.getByRole('button', { name: /Porsche 911 Carrera GTS/i });
    fireEvent.click(presetBtn);

    const nameInput = screen.getByPlaceholderText(/Ej. Porsche 911 GT3 RS/i);
    expect(nameInput.value).toBe('Porsche 911 Carrera GTS');

    const priceInput = screen.getByPlaceholderText('223800');
    expect(priceInput.value).toBe('185000');
  });
});
