import axios from "axios";
import { loadingFailure, loadingStart, loadingSuccess } from '../slices/userSlice'

export const loadUser = (email) => async ( dispatch) => {
  dispatch(loadingStart());
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const res = await axios.post(`http://localhost:3000/api/user/profile`, {email}, config);
    dispatch(loadingSuccess(res.data) );
  } catch (err) {
    dispatch(loadingFailure());
  }
};