// components/InstagramButton.tsx
"use client";

import React from "react";
import styles from "@/components/navbar/contactButton.module.css";

interface InstagramButtonProps {
  // You can add props here if you want to make it customizable
  text?: string;
}

const ContactButton: React.FC<InstagramButtonProps> = ({
  text = "Contact Me",
}) => {
  return (
    <button className={styles.button}>
      <span>{text}</span>
    </button>
  );
};

export default ContactButton;
