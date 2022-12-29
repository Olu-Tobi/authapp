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
    const res = await axios.post(process.env.NEXT_PUBLIC_API_CALL, {email}, config);
    dispatch(loadingSuccess(res.data) );
  } catch (err) {
    dispatch(loadingFailure());
  }
};