import {
  //   type PayloadAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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
  error: string;
  //   userlogin: boolean;
};

const initialState: UserState = {
  loading: false,
  user: { email: "", password: "" },
  error: "",
  //   userlogin: false,
};

// start of signup:
export const signupUser = createAsyncThunk<{ id: string; email: string }, User>(
  "user/signupUser",
  async (payload, thunkApi) => {
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
  }
);
// End of Signup.

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
      console.log(typeof action.payload === "string");
      state.loading = false;
      state.user = { email: "", password: "" };
      if (action.payload && typeof action.payload === "string") {
        if (action.payload.includes("email-already-in-use")) {
          state.error =
            "Email is already in use. Please use a different email address.";
        } else {
          state.error = action.payload;
        }
      } else {
        state.error = "An error occurred during sign up.";
      }
    });
  },
});

export default usersSlice.reducer;
