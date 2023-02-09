import { useState } from "react";

import { Ads } from "./Ads";

interface PositionType {
  x: number;
  y: number;
}

export const MouseTracker = ({
  render,
}: {
  render: (value: PositionType) => JSX.Element;
}) => {
  const [position, setPosition] = useState<PositionType>({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  return (
    <div onMouseMove={handleMouseMove}>
      <p style={{ color: "red" }}>Mouse Tracker</p>
      {render(position)}
    </div>
  );
};
