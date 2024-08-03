import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { db, auth } from "../../firebase-config";
import { FirebaseError } from "firebase/app";

export type User = {
  id: string;
  email: string;
  emailVerified?: boolean;
  password?: string;
  role: string;
  restaurant?: string;
};

type UserState = {
  loading: boolean;
  user: User;
  error: null | string;
  userlogin: boolean;
};

const initialState: UserState = {
  loading: false,
  user: {} as User,
  // user: null,
  error: null,
  userlogin: false,
};

// start of signup:
export const signupUser = createAsyncThunk<
  {
    id: string;
    email: string;
    role: string;
    restaurant?: string;
  },
  {
    email: string;
    password: string;
    role: string;
    restaurant?: string;
  }
>("user/signupUser", async (payload, thunkApi) => {
  const { email, password, role, restaurant } = payload;

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(user);
    // Send Email for verification in Firebase:
    await sendEmailVerification(auth.currentUser!);

    // Send User Data to firestore:
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, {
      id: user.uid,
      email,
      // password,
      role,
      ...(role === "seller" && { restaurant }),
    });

    const userData = {
      id: user.uid,
      email: email,
      role,
      ...(role === "seller" && { restaurant }),
    };
    return userData;
  } catch (error) {
    if (error instanceof FirebaseError) {
      return thunkApi.rejectWithValue(error.message);
    } else {
      return thunkApi.rejectWithValue("An error occurred during sign up.");
    }
  }
});
// End of Signup.

// Start of Login:
export const loginUser = createAsyncThunk<
  {
    id: string;
    email: string;
    // password: string;
    userlogin: boolean;
    error: string | null;
    role: string;
    restaurant?: string;
  },
  { email: string; password: string }
>("user/loginUser", async (payload, thunkApi) => {
  const { email, password } = payload;
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    if (response.user.emailVerified === false) {
      return thunkApi.rejectWithValue("Email is Not Verified");
    }

    const docRef = doc(db, "users", response.user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return thunkApi.rejectWithValue("User data not found.");
    }

    const userData = {
      id: docSnap.id,
      email: docSnap.data().email,
      // password: docSnap.data().password,
      userlogin: true,
      error: null,
      role: docSnap.data().role,
      ...(docSnap.data().role === "seller" && {
        restaurant: docSnap.data().restaurant,
      }),
    };

    return userData;
  } catch (error) {
    if (error instanceof FirebaseError) {
      return thunkApi.rejectWithValue(error.message);
    } else {
      return thunkApi.rejectWithValue("An error occurred during Login.");
    }
  }
});
// End of Login.

// Start of Logout User:
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkApi) => {
    try {
      await signOut(auth);
      return {};
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
// End of Logout User.

// Start of Load User:
export const loadUser = createAsyncThunk<
  {
    id: string;
    email: string;
    // password: string;
    userlogin: boolean;
    error: string | null;
    role: string;
    restaurant?: string;
  },
  {
    email: string | null;
    // password: string;
    emailVerified: boolean;
    uid: string;
  }
>("user/loadUser", async (payload, thunkApi) => {
  try {
    if (payload.emailVerified === false) {
      return thunkApi.rejectWithValue("Email is not verified");
    }
    const docRef = doc(db, "users", payload.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return thunkApi.rejectWithValue("User data not found.");
    }

    const userData = {
      id: docSnap.id,
      email: docSnap.data()?.email,
      // password: docSnap.data()?.password,
      userlogin: true,
      error: null,
      role: docSnap.data()?.role,
      ...(docSnap.data()?.role === "seller" && {
        restaurant: docSnap.data()?.restaurant,
      }),
    };

    return userData;
  } catch (error) {
    if (error instanceof FirebaseError) {
      return thunkApi.rejectWithValue(error.message);
    } else {
      return thunkApi.rejectWithValue("An error occurred during sign up.");
    }
  }
});
// End of of Load User.

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserLogin(state, action) {
      state.userlogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Signup Cases:
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = {
        id: action.payload.id,
        email: action.payload.email,
        // password: action.meta.arg.password,
        role: action.payload.role,
        ...(action.payload.role === "seller" && {
          restaurant: action.payload.restaurant,
        }),
      };
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      // state.loading = false;
      // state.user = {} as User;
      // if (action.payload && typeof action.payload === "string") {
      //   state.error = action.payload;
      // } else {
      //   state.error = "An error occurred during sign up.";
      // }

      state.loading = false;
      state.user = {} as User;
      state.userlogin = false;
      state.error = action.payload as string;
    });

    // Login with user & Password Cases:
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.user = {} as User;
        state.userlogin = false;
        state.error = action.payload.error;
      } else {
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          // password: action.meta.arg.password,
          role: action.payload.role,
          ...(action.payload.role === "seller" && {
            restaurant: action.payload.restaurant,
          }),
        };
        state.userlogin = true;
        state.error = null;
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      // state.loading = false;
      // state.user = {} as User;
      // if (action.payload && typeof action.payload === "string") {
      //   state.error = action.payload;
      // }
      state.loading = false;
      state.user = {} as User;
      state.userlogin = false;
      state.error = action.payload as string;
    });

    // Logout Cases:
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = {} as User;
      state.error = null;
      state.userlogin = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      // state.loading = false;
      // state.user = {} as User;
      // if (action.payload && typeof action.payload === "string") {
      //   state.error = action.payload;
      // }
      state.loading = false;
      state.user = {} as User;
      state.userlogin = false;
      state.error = action.payload as string;
    });

    // Load user Cases:
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.error) {
        state.user = {} as User;
        state.userlogin = false;
        state.error = action.payload.error;
      } else {
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          // password: action.meta.arg.password,
          role: action.payload.role,
          ...(action.payload.role === "seller" && {
            restaurant: action.payload.restaurant,
          }),
        };
        state.userlogin = true;
        state.error = null;
      }
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {} as User;
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const { setUserLogin } = usersSlice.actions;
export default usersSlice.reducer;
