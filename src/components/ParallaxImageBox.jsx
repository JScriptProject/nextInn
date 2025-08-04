import React, { useRef } from "react";

import { motion, useScroll, useTransform , useSpring  } from "framer-motion";

function ParallaxImageBox({ imgSrc }) {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });



  const y = useTransform(scrollYProgress, [0, 1], ["-150px", "150px"]);
  const smoothY = useSpring(y,{stiffness:100, damping:30, mass:1,})
  return (
    <motion.div className="relative h-[400px] overflow-hidden moving-img" ref={ref}>
      <motion.img 
        src={imgSrc}
        alt="room"
        className="w-full h-full object-cover"
        style={{ y:smoothY, scale: 2 , transform: 'translateZ(0)'}}
      />
    </motion.div>
  );
}

export default ParallaxImageBox;
