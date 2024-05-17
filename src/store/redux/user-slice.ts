import {
  //   type PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
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
  password: string;
  role: "user";
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
  error: null,
  userlogin: false,
};

// start of signup:
export const signupUser = createAsyncThunk<
  {
    id: string;
    email: string;
  },
  User
>("user/signupUser", async (payload, thunkApi) => {
  const { id, email, password } = payload;
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Send Email for verification in Firebase:
    await sendEmailVerification(auth.currentUser!);

    // Send User Data to firestore:
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, {
      id,
      email,
      password,
      role: "user",
    });

    const userData = {
      id: id,
      email: email,
      role: "user",
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
    // id: string;
    email: string;
    password: string;
    userlogin: boolean;
    error: string | null;
    role: string;
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
      password: docSnap.data().password,
      userlogin: true,
      error: null,
      role: docSnap.data().role === "admin" ? "admin" : "user",
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
// export const loadUser = createAsyncThunk<
//   {
//     id: string;
//     email: string;
//     password: string;
//     // userlogin: boolean;
//     error: string | null;
//   },
//   { id: string; emailVerified: boolean }
// >("user/loadUser", async (payload, thunkApi) => {
//   try {
//     if (payload.emailVerified === false) {
//       return thunkApi.rejectWithValue("Email is not verified");
//     }
//     console.log("payload", payload);
//     // console.log(payload);
//     // if (typeof payload.id !== "string") {
//     //   return thunkApi.rejectWithValue("Some error");
//     // }
//     const docRef = doc(db, "users", payload.id);
//     const docSnap = await getDoc(docRef);
//     console.log(docSnap.data());
//     console.log(docSnap);
//     if (!docSnap.exists()) {
//       return thunkApi.rejectWithValue("User data not found.");
//     }

//     const userData = {
//       id: docSnap.data().id,
//       email: docSnap.data().email,
//       password: docSnap.data().password,
//       userlogin: true,
//       error: null,
//     };

//     return userData;
//   } catch (error) {
//     if (error instanceof FirebaseError) {
//       return thunkApi.rejectWithValue(error.message);
//     } else {
//       return thunkApi.rejectWithValue("An error occurred during Login.");
//     }
//   }
// });
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
        password: action.meta.arg.password,
        role: "user",
      };
      // state.error = false;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {} as User;
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      } else {
        state.error = "An error occurred during sign up.";
      }
    });

    // Login with user & Password Cases:
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log(action.payload.role);
      state.loading = false;
      if (action.payload.error) {
        state.user = {} as User;
        state.userlogin = false;
        state.error = action.payload.error;
      } else {
        state.user = {
          id: "",
          email: action.payload.email,
          password: action.meta.arg.password,
          role: "user",
        };
        state.userlogin = true;
        state.error = null;
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {} as User;
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
      // else {
      //   state.error = "An error occurred during sign up.";
      // }
      // state.error = action.payload;
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
      state.loading = false;
      state.user = {} as User;
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });

    // Load User Cases:
    // builder.addCase(loadUser.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(loadUser.fulfilled, (state, action) => {
    //   state.loading = false;
    //   if (action.payload && action.payload.error) {
    //     state.user = {} as User;
    //     state.userlogin = false;
    //     state.error = action.payload.error;
    //   } else {
    //     state.user = {
    //       id: action.meta.arg.id,
    //       email: action.payload.email,
    //       // password: action.meta.arg.password,
    //       password: "",
    //       role: "user",
    //     };
    //     state.userlogin = true;
    //     state.error = null;
    //   }
    // });
    // builder.addCase(loadUser.rejected, (state, action) => {
    //   state.loading = false;
    //   state.user = {} as User;
    //   if (action.payload && typeof action.payload === "string") {
    //     state.error = action.payload;
    //   }
    // });
  },
});

export const { setUserLogin } = usersSlice.actions;
export default usersSlice.reducer;
