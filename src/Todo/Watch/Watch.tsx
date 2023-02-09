import { useEffect, useRef, useState } from "react";

function WatchTimer() {
  const intervalRef = useRef<any>(null);
  const [seconds, setSeconds] = useState<number>(0);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
      console.log("log 1");
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);
  return <div>Watch {seconds}</div>;
}
export const Watch = () => {
  const [visible, setVisible] = useState<boolean>(true);
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>Add</button>
      {visible && <WatchTimer />}
    </div>
  );
};
