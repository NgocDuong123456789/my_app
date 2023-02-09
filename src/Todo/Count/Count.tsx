import { useReducer } from "react";
const initalState = { age: 26 };
type ActionType =
  | { type: "increase" }
  | { type: "decrease" }
  | { type: "x"; payload: number };

const init = (inital: typeof initalState) => {
  return { ...inital, age: inital.age + 4 };
};

const reducer = (state: typeof initalState, action: ActionType) => {
  if (action.type === "increase") {
    return { ...state, age: state.age + 1 };
  }
  if (action.type === "decrease") {
    return { ...state, age: state.age - 1 };
  }

  if (action.type === "x") {
    return { ...state, age: state.age + action.payload };
  }
  throw Error("Invalid action: " + action);
};

const increment = () => {
  return { type: "increase" } as { type: "increase" };
};

const decrement = () => {
  return { type: "decrease" } as { type: "decrease" };
};
const increaseXAgeAction = (payload: number) => {
  return { type: "x", payload: payload } as { type: "x"; payload: number };
};

export const Count = () => {
  const [state, dispatch] = useReducer(reducer, initalState, init);
  const handleIn = () => {
    dispatch(increment());
  };
  const handleDe = () => {
    dispatch(decrement());
  };
  const increaseXage = (value: number) => {
    dispatch(increaseXAgeAction(value));
  };

  return (
    <>
      <button onClick={handleIn}>+</button>
      <h1>{state.age}</h1>
      <button onClick={handleDe}>-</button>
      <button onClick={() => increaseXage(3)}>0</button>
    </>
  );
};
