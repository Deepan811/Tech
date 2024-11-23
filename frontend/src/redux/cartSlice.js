import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch Cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await axios.get('/api/cart/getpro');
  return response.data;
  
});


// Add Product to Cart
export const addToCart = createAsyncThunk('cart/addToCart', async (product) => {
  const response = await axios.post('/api/cart/addpro', product);
  return response.data;
});

export const clearCart = createAsyncThunk('cart/clearCart', async () => {
  const response = await axios.delete('/api/cart/clear');
  return response.data; // Return success message
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId) => {
  const response = await axios.delete(`/api/cart/removepro/${productId}`);  // Endpoint for removing product
  return response.data;
});

export const updateQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, quantity }) => {
    const response = await axios.put(`/api/cart/updatequantity/${productId}`, { quantity });
    return response.data;
  }
);

export const checkout = createAsyncThunk('cart/checkout', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/api/checkout/getcheck', {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Checkout failed');
  }
});



const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.cart.products;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = []; // Reset items in Redux state
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        // Update cart state after product removal
        state.items = action.payload.products;  // Update the items list with the updated cart from backend
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        // Update the cart with the new quantity for the updated product
        const updatedProduct = action.payload;
        const updatedItems = state.items.map((item) =>
          item.productId === updatedProduct.productId
            ? { ...item, quantity: updatedProduct.quantity }
            : item
        );
        state.items = updatedItems;
      })
      .addCase(checkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});



export default cartSlice.reducer;
