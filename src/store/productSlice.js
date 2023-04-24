import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const initialState = {
  products: [],
  productsStatus: STATUS.IDLE,
  productSingle: [],
  productSingleStatus: STATUS.IDLE
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncProducts.pending, (state) => {
      state.productsStatus = STATUS.LOADING;
    });
    builder.addCase(fetchAsyncProducts.fulfilled, (state, action) => {
      state.productsStatus = STATUS.SUCCEEDED;
      state.products = action.payload;
    });
    builder.addCase(fetchAsyncProducts.rejected, (state) => {
      state.productsStatus = STATUS.FAILED;
    });
    builder.addCase(fetchAsyncProductSingle.pending, (state) => {
      state.productSingleStatus = STATUS.LOADING;
    });
    builder.addCase(fetchAsyncProductSingle.fulfilled, (state, action) => {
      state.productSingleStatus = STATUS.SUCCEEDED;
      state.productSingle = action.payload;
    });
    builder.addCase(fetchAsyncProductSingle.rejected, (state) => {
      state.productSingleStatus = STATUS.FAILED;
    });
  }
});

export const fetchAsyncProducts = createAsyncThunk(
  "products/fetch",
  async (limit) => {
    const response = await fetch(`${BASE_URL}products?limit=${limit}`);
    const data = await response.json();
    return data.products;
  }
);

//get single product data also
export const fetchAsyncProductSingle = createAsyncThunk(
  "product-single/fetch",
  async (id) => {
    const response = await fetch(`${BASE_URL}products/${id}`);
    const data = await response.json();
    return data;
  }
);

export const getAllProducts = (state) => state.product.products;
export const getAllProductsStatus = (state) => state.product.productsStatus;
export const getSingleProduct = (state) => state.product.productSingle;
export const getSingleProductStatus = (state) =>
  state.product.productSingleStatus;
export default productSlice.reducer;
