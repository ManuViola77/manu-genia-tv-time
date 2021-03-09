import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useDispatchHook = (action, ...dependencies) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback((payload) => dispatch(action(payload)), [
    dispatch,
    action,
    // eslint-disable-next-line
    ...dependencies,
  ]);
};

export default useDispatchHook;
