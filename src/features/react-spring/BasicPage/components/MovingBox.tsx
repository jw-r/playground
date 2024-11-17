"use client";

import { animated, useSpring } from "@react-spring/web";

const MovingBox = () => {
  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }));

  const handleClick = () => {
    api.start({
      from: {
        x: 0,
      },
      to: {
        x: 100,
      },
    });
  };

  return (
    <animated.div
      onClick={handleClick}
      className="size-[80px] bg-red-300 rounded-[8px]"
      style={{ ...springs }}
    />
  );
};

export default MovingBox;
