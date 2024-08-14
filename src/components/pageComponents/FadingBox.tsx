import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Box } from "@chakra-ui/react";

// Define the type for props
type FadingBoxProps = {
  children: ReactNode;
};

const FadingBox: React.FC<FadingBoxProps> = (props) => {
  // State to manage the visibility of the component
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Ref to keep track of the DOM element
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Get the current reference to the DOM element
    const currentRef = boxRef.current;

    // IntersectionObserver to detect when the element enters the viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Set visibility to true when the element is in the viewport
          setIsVisible(true);
        }
      });
    });

    // Observe the current DOM element if it exists
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup function to unobserve the element when the component unmounts
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <Box
      ref={boxRef}
      className={`animated-box ${isVisible ? "visible" : ""}`}
      opacity={isVisible ? 1 : 0}
      transition="opacity 1.0s ease-in"
    >
      {props.children}
    </Box>
  );
};

export default FadingBox;
