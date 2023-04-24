import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const initialState = {
  categories: [],
  categoriesStatus: STATUS.IDLE,
  categoryProducts: [],
  categoryProductsStatus: STATUS.IDLE
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncCategories.pending, (state, action) => {
      state.categoriesStatus = STATUS.LOADING;
    });
    builder.addCase(fetchAsyncCategories.fulfilled, (state, action) => {
      state.categoriesStatus = STATUS.SUCCEEDED;
      state.categories = action.payload;
    });
    builder.addCase(fetchAsyncCategories.rejected, (state, action) => {
      state.categoriesStatus = STATUS.FAILED;
    });
    builder.addCase(fetchAsyncProductsOfCategory.pending, (state, action) => {
      state.categoryProductsStatus = STATUS.LOADING;
    });
    builder.addCase(fetchAsyncProductsOfCategory.fulfilled, (state, action) => {
      state.categoryProductsStatus = STATUS.SUCCEEDED;
      state.categoryProducts = action.payload;
    });
    builder.addCase(fetchAsyncProductsOfCategory.rejected, (state, action) => {
      state.categoryProductsStatus = STATUS.FAILED;
    });
  }
});

export const fetchAsyncCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    const response = await fetch(`${BASE_URL}products/categories`);
    const data = await response.json();
    return data;
  }
);

export const fetchAsyncProductsOfCategory = createAsyncThunk(
  "category-products/fetch",
  async (category) => {
    const response = await fetch(`${BASE_URL}products/category/${category}`);
    const data = await response.json();
    return data.products;
  }
);

export const getAllCategories = (state) => state.category.categories;
export const getAllProductsByCategory = (state) =>
  state.category.categoryProducts;
export const getCategoryProductsStatus = (state) =>
  state.category.categoryProductsStatus;

export const categoryReducer = categorySlice.reducer;
