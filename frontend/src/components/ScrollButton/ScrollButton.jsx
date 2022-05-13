import React, { useState } from "react";
import { Button } from "./ScrollButton.styled";
import { BsArrowUp } from "react-icons/bs";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Button>
      <BsArrowUp
        onClick={scrollToTop}
        style={{
          display: visible ? "inline" : "none",
          background: "#222",
          borderRadius: "50%",
          padding: "0.7rem",
        }}
      />
    </Button>
  );
};

export default ScrollButton;
