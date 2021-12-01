import { actionCreators } from "../redux";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { useMemo } from "react";

export const useActions = () => {
  const dispatch = useDispatch();
  //  return bindActionCreators(actionCreators, dispatch)

  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
