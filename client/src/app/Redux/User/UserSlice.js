import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  showError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.showError = false;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
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
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      state.showError = false;
    },
    logoutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.showError = true;
    },
    updateUserStart: (state) => {
      state.loading = true;
      state.showError = false;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      state.showError = false;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.showError = true;
    },
    setShowError: (state, action) => {
      state.showError = action.payload;
    },
    verifyOtpStart: (state) => {
      state.loading = true;
      state.showError = false;
    },
    verifyOtpSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
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
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  setShowError,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  resendOtpStart,
  resendOtpSuccess,
  resendOtpFailure,
} = userSlice.actions;

export default userSlice.reducer;

const signUp = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
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

const logIn = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
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

const logOut = async () => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
      {},
      {
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

const updateProfile = async (data) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/update-profile`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
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

const googleSignMethod = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google/sign`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify/otp`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
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

const requestOTPagain = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/request/otp`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
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

export {
  signUp,
  logIn,
  logOut,
  updateProfile,
  googleSignMethod,
  verifyOTP,
  requestOTPagain,
};
