import { createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentAdmin: null,
  error: null,
  loading: false,
  showError: false,
  currentPage: null,
  currentPageID: null,
  currentPageTitle: null,
  currentComponent: null,
  currentComponentID: null,
  currentComponentTitle: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.showError = false;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentAdmin = action.payload;
      state.error = null;
      state.showError = false;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.showError = true;
    },
    logoutUserStart: (state) => {
      state.loading = true;
      state.showError = false;
    },
    logoutUserSuccess: (state) => {
      state.currentAdmin = null;
      state.loading = false;
      state.error = null;
      state.showError = false;
      state.currentPage = null;
      state.currentPageID = null;
      state.currentPageTitle = null;
      state.currentComponent = null;
      state.currentComponentID = null;
      state.currentComponentTitle = null;
    },
    logoutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.showError = true;
    },
    verifyOtpStart: (state) => {
      state.loading = true;
      state.showError = false;
    },
    verifyOtpSuccess: (state, action) => {
      state.loading = false;
      state.currentAdmin = action.payload;
      state.error = null;
      state.showError = false;
    },
    verifyOtpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.showError = true;
    },
    resendOtpStart: (state) => {
      state.loading = true;
      state.showError = false;
    },
    resendOtpSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    resendOtpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.showError = true;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentPageID: (state, action) => {
      state.currentPageID = action.payload;
    },
    setCurrentPageTitle: (state, action) => {
      state.currentPageTitle = action.payload;
    },
    setCurrentComponent: (state, action) => {
      state.currentComponent = action.payload;
    },
    setCurrentComponentID: (state, action) => {
      state.currentComponentID = action.payload;
    },
    setCurrentComponentTitle: (state, action) => {
      state.currentComponentTitle = action.payload;
    },
    setPageInfo: (state, action) => {
      const { page, pageID, pageTitle } = action.payload;
      state.currentPage = page;
      state.currentPageID = pageID;
      state.currentPageTitle = pageTitle;
    },
    setComponentInfo: (state, action) => {
      const { component, componentID, componentTitle } = action.payload;
      state.currentComponent = component;
      state.currentComponentID = componentID;
      state.currentComponentTitle = componentTitle;
    },
    resetNavigation: (state) => {
      state.currentPage = null;
      state.currentPageID = null;
      state.currentPageTitle = null;
      state.currentComponent = null;
      state.currentComponentID = null;
      state.currentComponentTitle = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  resendOtpStart,
  resendOtpSuccess,
  resendOtpFailure,
  setCurrentPage,
  setCurrentPageID,
  setCurrentPageTitle,
  setCurrentComponent,
  setCurrentComponentID,
  setCurrentComponentTitle,
  setPageInfo,
  setComponentInfo,
  resetNavigation,
} = adminSlice.actions;

export default adminSlice.reducer;

const logIn = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/login`,
      data,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      return {
        data: {
          success: false,
          message: "Network Error or Server not reachable",
        },
      };
    }
  }
};

const verifyOTP = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/verify`,
      data,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else {
      return {
        data: {
          success: false,
          message: "Network Error or Server not reachable",
        },
      };
    }
  }
};

export { logIn, verifyOTP };
