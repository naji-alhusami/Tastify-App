import {
  //   type PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

import { db, auth } from "../../firebase-config";
import { FirebaseError } from "firebase/app";

export type User = {
  // id: string;
  email: string;
  password: string;
};

type UserState = {
  loading: boolean;
  user: User;
  error: null | string;
  userlogin: boolean;
};

const initialState: UserState = {
  loading: false,
  user: { email: "", password: "" },
  error: null,
  userlogin: false,
};

// start of signup:
export const signupUser = createAsyncThunk<
  {
    //  id: string;
    email: string;
  },
  User
>("user/signupUser", async (payload, thunkApi) => {
  const { email, password } = payload;
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
      id: user.uid,
      email,
      password,
    });

    return { id: user.uid, email: user.email! };
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
    password: string;
    userlogin: boolean;
    error: string | null;
  },
  User,
  {
    rejectValue: string;
  }
>("user/loginUser", async (payload, thunkApi) => {
  const { email, password } = payload;
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(email);

    if (response.user.emailVerified === false) {
      return thunkApi.rejectWithValue("Email is Not Verified");
    }

    const docRef = doc(db, "users", response.user.uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());

    if (!docSnap.exists()) {
      return thunkApi.rejectWithValue("User data not found."); // Handle case where user data does not exist
    }

    const userData = {
      id: docSnap.id,
      email: docSnap.data().email,
      password: docSnap.data().password,
      userlogin: true,
      error: null,
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

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // fill in primary logic here
  },
  extraReducers: (builder) => {
    // Signup Cases:
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = {
        email: action.payload.email,
        password: action.meta.arg.password,
      };
      // state.error = false;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.user = { email: "", password: "" };
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      } else {
        state.error = "An error occurred during sign up.";
      }
    });

    // Login with user & Password Cases:
    builder.addCase(loginUser.pending, () => {});
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.user = { email: "", password: "" };
        state.userlogin = false;
        state.error = action.payload.error;
      } else {
        state.user = {
          // id: action.payload.id,
          email: action.payload.email,
          password: action.meta.arg.password,
        };
        state.userlogin = true;
        state.error = null;
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.user = { email: "", password: "" };
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      } else {
        state.error = "An error occurred during sign up.";
      }
      // state.error = action.payload;
    });
  },
});

export default usersSlice.reducer;
