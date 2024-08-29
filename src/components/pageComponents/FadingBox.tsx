import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Box } from "@chakra-ui/react";

type FadingBoxProps = {
  children: ReactNode;
};

const FadingBox: React.FC<FadingBoxProps> = (props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentRef = boxRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <Box
      ref={boxRef}
      style={{
        backgroundColor: "white",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-in",
        height: "100%",
        width: "100%",
      }}
    >
      {props.children}
    </Box>
  );
};

export default FadingBox;
