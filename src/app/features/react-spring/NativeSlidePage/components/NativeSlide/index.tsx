"use client";

import { PropsWithChildren } from "react";
import styles from "./styles.module.css";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "react-use-gesture";

const left = {
  bg: `linear-gradient(120deg, #f093fb 0%, #f5576c 100%)`,
  justifySelf: "end",
};
const right = {
  bg: `linear-gradient(120deg, #96fbc4 0%, #f9f586 100%)`,
  justifySelf: "start",
};

const NativeSlide = ({ children }: PropsWithChildren) => {
  const [{ x, bg, scale, justifySelf }, api] = useSpring(() => ({
    x: 0,
    scale: 1,
    ...left,
  }));

  const bind = useDrag(({ active, movement: [mx] }) => {
    const x = Math.max(-200, Math.min(mx, 200));

    api.start({
      x: active ? x : 0,
      scale: active ? 1.1 : 1,
      ...(x < 0 ? left : right),
      immediate: (name) => active && name === "x",
    });
  });

  const avSize = x.to({
    map: Math.abs,
    range: [50, 200],
    output: [1, 0.5],
    extrapolate: "clamp",
  });

  return (
    <animated.div
      {...bind()}
      className={styles.item}
      style={{ background: bg }}
    >
      <animated.div
        className={styles.av}
        style={{ scale: avSize, justifySelf }}
      />
      <animated.div className={styles.fg} style={{ x, scale }}>
        {children}
      </animated.div>
    </animated.div>
  );
};

export default NativeSlide;
