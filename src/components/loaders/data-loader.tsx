import * as motion from "motion/react-client";

const Cube = ({ size }: { size: number }) => {
  const faceCommon: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    border: "1px solid rgba(0,255,255,0.3)",
    backfaceVisibility: "hidden",
    boxShadow: "inset 0 0 20px rgba(0, 255, 255, 0.2)",
  };

  const faceColors = [
    "linear-gradient(to bottom right, #00ffe1, #0088ff)",
    "linear-gradient(to bottom right, #00ffc8, #005577)",
    "linear-gradient(to bottom right, #88ffcc, #0099aa)",
    "linear-gradient(to bottom right, #00ccaa, #005566)",
    "linear-gradient(to bottom right, #00ffaa, #008877)",
    "linear-gradient(to bottom right, #008877, #003344)",
  ];

  const transforms = [
    `translateZ(${size / 2}px)`,
    `rotateY(180deg) translateZ(${size / 2}px)`,
    `rotateY(90deg) translateZ(${size / 2}px)`,
    `rotateY(-90deg) translateZ(${size / 2}px)`,
    `rotateX(90deg) translateZ(${size / 2}px)`,
    `rotateX(-90deg) translateZ(${size / 2}px)`,
  ];

  return (
    <motion.div
      style={{
        width: size,
        height: size,
        position: "relative",
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
      animate={{
        rotateX: [0, 360],
        rotateY: [0, 360],
        rotateZ: [0, 360],
      }}
      transition={{
        duration: 6,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {transforms.map((transform, i) => (
        <div
          key={i}
          style={{
            ...faceCommon,
            transform,
            background: faceColors[i],
          }}
        />
      ))}
    </motion.div>
  );
};

interface DataLoaderProps {
  className?: string;
}

const DataLoader = ({ className }: DataLoaderProps) => {
  const orbitRadius = 40;
  const cubeSize = 40;
  const duration = 8;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
        // perspective: "1000px",
        // overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: orbitRadius * 2 + cubeSize,
          height: orbitRadius * 2 + cubeSize,
          transformStyle: "preserve-3d",
        }}
      >
        {[0, 1, 2].map((index) => {
          const initialAngle = index * 120;

          return (
            <motion.div
              key={index}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 0,
                height: 0,
                transform: `rotate(${initialAngle}deg)`,
                transformOrigin: "center center",
                filter: "drop-shadow(0 0 8px rgba(0,255,255,0.5)) blur(0.1px)",
              }}
              animate={{ rotate: [initialAngle, initialAngle + 360] }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div
                style={{
                  transform: `translateX(${orbitRadius}px) translateY(-50%)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <Cube size={cubeSize} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export { DataLoader };
