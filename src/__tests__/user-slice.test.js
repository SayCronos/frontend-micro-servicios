import { describe, it, expect, beforeEach } from 'vitest';
import userReducer, {
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  placeOrder,
  userLogin,
  userLogout,
} from '../store/user-slice';

describe('Redux userSlice Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial state with empty collections', () => {
    const state = userReducer(undefined, { type: 'unknown' });
    expect(state.cart).toEqual([]);
    expect(state.wishlist).toEqual([]);
    expect(state.orders).toEqual([]);
  });

  describe('Cart Actions', () => {
    it('should add a new vehicle to the cart and update localStorage', () => {
      const product = { _id: 'p1', name: 'Porsche 911 GT3 RS', price: 223800 };
      const nextState = userReducer(undefined, addToCart({ product, _id: 'p1', qty: 1 }));

      expect(nextState.cart).toHaveLength(1);
      expect(nextState.cart[0].product.name).toBe('Porsche 911 GT3 RS');
      expect(nextState.cart[0].unit).toBe(1);

      const stored = JSON.parse(localStorage.getItem('porsche_cart'));
      expect(stored).toHaveLength(1);
    });

    it('should increment quantity when same item added again', () => {
      const product = { _id: 'p1', name: 'Porsche 911 GT3 RS', price: 223800 };
      let state = userReducer(undefined, addToCart({ product, _id: 'p1', qty: 1 }));
      state = userReducer(state, addToCart({ product, _id: 'p1', qty: 3 }));

      expect(state.cart).toHaveLength(1);
      expect(state.cart[0].unit).toBe(3);
    });

    it('should remove item from cart and sync localStorage', () => {
      const product = { _id: 'p1', name: 'Porsche 911' };
      let state = userReducer(undefined, addToCart({ product, _id: 'p1', qty: 1 }));
      state = userReducer(state, removeFromCart('p1'));

      expect(state.cart).toHaveLength(0);
      const stored = JSON.parse(localStorage.getItem('porsche_cart'));
      expect(stored).toHaveLength(0);
    });
  });

  describe('Wishlist Actions', () => {
    it('should add vehicle to wishlist without duplicates', () => {
      const item = { _id: 'p1', name: 'Taycan Turbo S' };
      let state = userReducer(undefined, addToWishlist(item));
      state = userReducer(state, addToWishlist(item));

      expect(state.wishlist).toHaveLength(1);
      expect(state.wishlist[0].name).toBe('Taycan Turbo S');
    });

    it('should remove vehicle from wishlist', () => {
      const item = { _id: 'p1', name: 'Taycan Turbo S' };
      let state = userReducer(undefined, addToWishlist(item));
      state = userReducer(state, removeFromWishlist('p1'));

      expect(state.wishlist).toHaveLength(0);
    });
  });

  describe('Orders & Checkout', () => {
    it('should place order, append to orders list, and clear cart', () => {
      const product = { _id: 'p1', name: 'Panamera', price: 191000 };
      let state = userReducer(undefined, addToCart({ product, _id: 'p1', qty: 1 }));

      const orderPayload = {
        _id: 'ord_1',
        orderId: 'PORSCHE-123456',
        amount: 191000,
        txnId: 'TXN-999',
        status: 'Confirmado',
      };

      state = userReducer(state, placeOrder(orderPayload));

      expect(state.orders).toHaveLength(1);
      expect(state.orders[0].orderId).toBe('PORSCHE-123456');
      expect(state.cart).toHaveLength(0);
      expect(localStorage.getItem('porsche_cart')).toBeNull();
    });
  });

  describe('Auth Lifecycle', () => {
    it('should set user on login and clear on logout', () => {
      let state = userReducer(undefined, userLogin({ id: 'u1', token: 'jwt_abc' }));
      expect(state.user.token).toBe('jwt_abc');

      state = userReducer(state, userLogout());
      expect(state.user).toEqual({});
      expect(state.cart).toEqual([]);
    });
  });
});
