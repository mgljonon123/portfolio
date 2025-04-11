// components/CubeAnimation.tsx
"use client";

import React from "react";

// Define CSS as a constant
const styles = `
  @keyframes hue-rotate {
    to {
      filter: hue-rotate(360deg);
    }
  }

  .container {
    --w: 35px;
    --g: 5px;
    --t: calc(var(--w) + var(--g));
    width: var(--w);
    aspect-ratio: 1;
    perspective: 120px;
    transform-style: preserve-3d;
    position: relative;
  }

  .cube {
    --fz: 0;
    --rx: 0;
    --fx: 0;
    --ry: 0;
    --fy: 0;
    position: absolute;
    background: #fffc;
    border: 2px solid black;
    width: var(--w);
    aspect-ratio: 1;
    bottom: calc(var(--w) * -0.5);
    right: calc(var(--w) * -0.5);
    animation:
      rotate 20s linear infinite,
      hue-rotate 20s linear infinite;
    transition: 5s;
    --a: translateZ(calc(0.5 * var(--w)))
      translateX(calc(var(--x) * var(--t) - 0.5 * var(--fy) * var(--w)))
      translateY(calc(var(--y) * var(--t) - 0.5 * var(--fx) * var(--w)))
      translateZ(
        calc(
          var(--z) * var(--t) - 0.5 * var(--ry) * var(--w) - 0.5 * var(--rx) *
            var(--w) - var(--fz) * var(--w)
        )
      )
      rotateX(calc(90deg * var(--rx))) rotateY(calc(90deg * var(--ry)));
    --p: translateX(calc(-0.5 * var(--w))) translateY(calc(-0.5 * var(--w)))
      translateZ(calc(-0.5 * var(--w)));
    transform: var(--p) var(--a);
  }

  .cube:hover {
    background: #f00e;
    transition: 0s;
  }

  @keyframes rotate {
    0% {
      transform: var(--p) rotateZ(0deg) rotateY(0deg) rotateX(0deg) var(--a);
    }
    to {
      transform: var(--p) rotateZ(360deg) rotateY(720deg) rotateX(360deg) var(--a);
    }
  }
`;

// Define cube properties interface
interface CubeProps {
  x: number;
  y: number;
  z: number;
  fz?: number;
  rx?: number;
  fx?: number;
  ry?: number;
  fy?: number;
}

// Cube component
const Cube: React.FC<CubeProps> = ({
  x,
  y,
  z,
  fz = 0,
  rx = 0,
  fx = 0,
  ry = 0,
  fy = 0,
}) => (
  <div
    className="cube"
    style={{
      ["--x" as string]: x,
      ["--y" as string]: y,
      ["--z" as string]: z,
      ["--fz" as string]: fz,
      ["--rx" as string]: rx,
      ["--fx" as string]: fx,
      ["--ry" as string]: ry,
      ["--fy" as string]: fy,
    }}
  />
);

// Main component
const CubeAnimation: React.FC = () => {
  // Complete array of all cube configurations
  const cubeConfigs: CubeProps[] = [
    { x: -1, y: -1, z: -1, fz: 0 },
    { x: -1, y: -1, z: -1, fz: 1 },
    { x: -1, y: -1, z: -1, rx: 1, fx: -1 },
    { x: -1, y: -1, z: -1, rx: 1, fx: 1 },
    { x: -1, y: -1, z: -1, ry: 1, fy: -1 },
    { x: -1, y: -1, z: -1, ry: 1, fy: 1 },
    { x: -1, y: -1, z: 0, fz: 0 },
    { x: -1, y: -1, z: 0, fz: 1 },
    { x: -1, y: -1, z: 0, rx: 1, fx: -1 },
    { x: -1, y: -1, z: 0, rx: 1, fx: 1 },
    { x: -1, y: -1, z: 0, ry: 1, fy: -1 },
    { x: -1, y: -1, z: 0, ry: 1, fy: 1 },
    { x: -1, y: -1, z: 1, fz: 0 },
    { x: -1, y: -1, z: 1, fz: 1 },
    { x: -1, y: -1, z: 1, rx: 1, fx: -1 },
    { x: -1, y: -1, z: 1, rx: 1, fx: 1 },
    { x: -1, y: -1, z: 1, ry: 1, fy: -1 },
    { x: -1, y: -1, z: 1, ry: 1, fy: 1 },
    { x: -1, y: 0, z: -1, fz: 0 },
    { x: -1, y: 0, z: -1, fz: 1 },
    { x: -1, y: 0, z: -1, rx: 1, fx: -1 },
    { x: -1, y: 0, z: -1, rx: 1, fx: 1 },
    { x: -1, y: 0, z: -1, ry: 1, fy: -1 },
    { x: -1, y: 0, z: -1, ry: 1, fy: 1 },
    { x: -1, y: 0, z: 0, fz: 0 },
    { x: -1, y: 0, z: 0, fz: 1 },
    { x: -1, y: 0, z: 0, rx: 1, fx: -1 },
    { x: -1, y: 0, z: 0, rx: 1, fx: 1 },
    { x: -1, y: 0, z: 0, ry: 1, fy: -1 },
    { x: -1, y: 0, z: 0, ry: 1, fy: 1 },
    { x: -1, y: 0, z: 1, fz: 0 },
    { x: -1, y: 0, z: 1, fz: 1 },
    { x: -1, y: 0, z: 1, rx: 1, fx: -1 },
    { x: -1, y: 0, z: 1, rx: 1, fx: 1 },
    { x: -1, y: 0, z: 1, ry: 1, fy: -1 },
    { x: -1, y: 0, z: 1, ry: 1, fy: 1 },
    { x: -1, y: 1, z: -1, fz: 0 },
    { x: -1, y: 1, z: -1, fz: 1 },
    { x: -1, y: 1, z: -1, rx: 1, fx: -1 },
    { x: -1, y: 1, z: -1, rx: 1, fx: 1 },
    { x: -1, y: 1, z: -1, ry: 1, fy: -1 },
    { x: -1, y: 1, z: -1, ry: 1, fy: 1 },
    { x: -1, y: 1, z: 0, fz: 0 },
    { x: -1, y: 1, z: 0, fz: 1 },
    { x: -1, y: 1, z: 0, rx: 1, fx: -1 },
    { x: -1, y: 1, z: 0, rx: 1, fx: 1 },
    { x: -1, y: 1, z: 0, ry: 1, fy: -1 },
    { x: -1, y: 1, z: 0, ry: 1, fy: 1 },
    { x: -1, y: 1, z: 1, fz: 0 },
    { x: -1, y: 1, z: 1, fz: 1 },
    { x: -1, y: 1, z: 1, rx: 1, fx: -1 },
    { x: -1, y: 1, z: 1, rx: 1, fx: 1 },
    { x: -1, y: 1, z: 1, ry: 1, fy: -1 },
    { x: -1, y: 1, z: 1, ry: 1, fy: 1 },
    { x: 0, y: -1, z: -1, fz: 0 },
    { x: 0, y: -1, z: -1, fz: 1 },
    { x: 0, y: -1, z: -1, rx: 1, fx: -1 },
    { x: 0, y: -1, z: -1, rx: 1, fx: 1 },
    { x: 0, y: -1, z: -1, ry: 1, fy: -1 },
    { x: 0, y: -1, z: -1, ry: 1, fy: 1 },
    { x: 0, y: -1, z: 0, fz: 0 },
    { x: 0, y: -1, z: 0, fz: 1 },
    { x: 0, y: -1, z: 0, rx: 1, fx: -1 },
    { x: 0, y: -1, z: 0, rx: 1, fx: 1 },
    { x: 0, y: -1, z: 0, ry: 1, fy: -1 },
    { x: 0, y: -1, z: 0, ry: 1, fy: 1 },
    { x: 0, y: -1, z: 1, fz: 0 },
    { x: 0, y: -1, z: 1, fz: 1 },
    { x: 0, y: -1, z: 1, rx: 1, fx: -1 },
    { x: 0, y: -1, z: 1, rx: 1, fx: 1 },
    { x: 0, y: -1, z: 1, ry: 1, fy: -1 },
    { x: 0, y: -1, z: 1, ry: 1, fy: 1 },
    { x: 0, y: 0, z: -1, fz: 0 },
    { x: 0, y: 0, z: -1, fz: 1 },
    { x: 0, y: 0, z: -1, rx: 1, fx: -1 },
    { x: 0, y: 0, z: -1, rx: 1, fx: 1 },
    { x: 0, y: 0, z: -1, ry: 1, fy: -1 },
    { x: 0, y: 0, z: -1, ry: 1, fy: 1 },
    { x: 0, y: 0, z: 0, fz: 0 },
    { x: 0, y: 0, z: 0, fz: 1 },
    { x: 0, y: 0, z: 0, rx: 1, fx: -1 },
    { x: 0, y: 0, z: 0, rx: 1, fx: 1 },
    { x: 0, y: 0, z: 0, ry: 1, fy: -1 },
    { x: 0, y: 0, z: 0, ry: 1, fy: 1 },
    { x: 0, y: 0, z: 1, fz: 0 },
    { x: 0, y: 0, z: 1, fz: 1 },
    { x: 0, y: 0, z: 1, rx: 1, fx: -1 },
    { x: 0, y: 0, z: 1, rx: 1, fx: 1 },
    { x: 0, y: 0, z: 1, ry: 1, fy: -1 },
    { x: 0, y: 0, z: 1, ry: 1, fy: 1 },
    { x: 0, y: 1, z: -1, fz: 0 },
    { x: 0, y: 1, z: -1, fz: 1 },
    { x: 0, y: 1, z: -1, rx: 1, fx: -1 },
    { x: 0, y: 1, z: -1, rx: 1, fx: 1 },
    { x: 0, y: 1, z: -1, ry: 1, fy: -1 },
    { x: 0, y: 1, z: -1, ry: 1, fy: 1 },
    { x: 0, y: 1, z: 0, fz: 0 },
    { x: 0, y: 1, z: 0, fz: 1 },
    { x: 0, y: 1, z: 0, rx: 1, fx: -1 },
    { x: 0, y: 1, z: 0, rx: 1, fx: 1 },
    { x: 0, y: 1, z: 0, ry: 1, fy: -1 },
    { x: 0, y: 1, z: 0, ry: 1, fy: 1 },
    { x: 0, y: 1, z: 1, fz: 0 },
    { x: 0, y: 1, z: 1, fz: 1 },
    { x: 0, y: 1, z: 1, rx: 1, fx: -1 },
    { x: 0, y: 1, z: 1, rx: 1, fx: 1 },
    { x: 0, y: 1, z: 1, ry: 1, fy: -1 },
    { x: 0, y: 1, z: 1, ry: 1, fy: 1 },
    { x: 1, y: -1, z: -1, fz: 0 },
    { x: 1, y: -1, z: -1, fz: 1 },
    { x: 1, y: -1, z: -1, rx: 1, fx: -1 },
    { x: 1, y: -1, z: -1, rx: 1, fx: 1 },
    { x: 1, y: -1, z: -1, ry: 1, fy: -1 },
    { x: 1, y: -1, z: -1, ry: 1, fy: 1 },
    { x: 1, y: -1, z: 0, fz: 0 },
    { x: 1, y: -1, z: 0, fz: 1 },
    { x: 1, y: -1, z: 0, rx: 1, fx: -1 },
    { x: 1, y: -1, z: 0, rx: 1, fx: 1 },
    { x: 1, y: -1, z: 0, ry: 1, fy: -1 },
    { x: 1, y: -1, z: 0, ry: 1, fy: 1 },
    { x: 1, y: -1, z: 1, fz: 0 },
    { x: 1, y: -1, z: 1, fz: 1 },
    { x: 1, y: -1, z: 1, rx: 1, fx: -1 },
    { x: 1, y: -1, z: 1, rx: 1, fx: 1 },
    { x: 1, y: -1, z: 1, ry: 1, fy: -1 },
    { x: 1, y: -1, z: 1, ry: 1, fy: 1 },
    { x: 1, y: 0, z: -1, fz: 0 },
    { x: 1, y: 0, z: -1, fz: 1 },
    { x: 1, y: 0, z: -1, rx: 1, fx: -1 },
    { x: 1, y: 0, z: -1, rx: 1, fx: 1 },
    { x: 1, y: 0, z: -1, ry: 1, fy: -1 },
    { x: 1, y: 0, z: -1, ry: 1, fy: 1 },
    { x: 1, y: 0, z: 0, fz: 0 },
    { x: 1, y: 0, z: 0, fz: 1 },
    { x: 1, y: 0, z: 0, rx: 1, fx: -1 },
    { x: 1, y: 0, z: 0, rx: 1, fx: 1 },
    { x: 1, y: 0, z: 0, ry: 1, fy: -1 },
    { x: 1, y: 0, z: 0, ry: 1, fy: 1 },
    { x: 1, y: 0, z: 1, fz: 0 },
    { x: 1, y: 0, z: 1, fz: 1 },
    { x: 1, y: 0, z: 1, rx: 1, fx: -1 },
    { x: 1, y: 0, z: 1, rx: 1, fx: 1 },
    { x: 1, y: 0, z: 1, ry: 1, fy: -1 },
    { x: 1, y: 0, z: 1, ry: 1, fy: 1 },
    { x: 1, y: 1, z: -1, fz: 0 },
    { x: 1, y: 1, z: -1, fz: 1 },
    { x: 1, y: 1, z: -1, rx: 1, fx: -1 },
    { x: 1, y: 1, z: -1, rx: 1, fx: 1 },
    { x: 1, y: 1, z: -1, ry: 1, fy: -1 },
    { x: 1, y: 1, z: -1, ry: 1, fy: 1 },
    { x: 1, y: 1, z: 0, fz: 0 },
    { x: 1, y: 1, z: 0, fz: 1 },
    { x: 1, y: 1, z: 0, rx: 1, fx: -1 },
    { x: 1, y: 1, z: 0, rx: 1, fx: 1 },
    { x: 1, y: 1, z: 0, ry: 1, fy: -1 },
    { x: 1, y: 1, z: 0, ry: 1, fy: 1 },
    { x: 1, y: 1, z: 1, fz: 0 },
    { x: 1, y: 1, z: 1, fz: 1 },
    { x: 1, y: 1, z: 1, rx: 1, fx: -1 },
    { x: 1, y: 1, z: 1, rx: 1, fx: 1 },
    { x: 1, y: 1, z: 1, ry: 1, fy: -1 },
    { x: 1, y: 1, z: 1, ry: 1, fy: 1 },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        {cubeConfigs.map((config, index) => (
          <Cube key={index} {...config} />
        ))}
      </div>
    </>
  );
};

export default CubeAnimation;
