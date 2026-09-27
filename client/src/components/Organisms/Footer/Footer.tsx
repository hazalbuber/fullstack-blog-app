import React from "react";
import { Box, Heading, VStack, Text, HStack } from "@chakra-ui/react";
import styles from "./Footer.module.css";
const Footer = () => {
  const sections = Array(5).fill("Lorem Ipsum");
  return (
    <div className={styles.footer}>
      <div>
        <HStack className={styles.container}>
          {sections.map((heading, index) => (
            <Box key={index} className={styles.subContainer1}>
              <Heading className={styles.heading}>{heading}</Heading>
              <VStack>
                {Array(6)
                  .fill(heading)
                  .map((text, idx) => (
                    <Text key={idx} className={styles.text}>
                      {text}
                    </Text>
                  ))}
              </VStack>
            </Box>
          ))}
        </HStack>
      </div>

      <div>
        <HStack>
          <HStack className={styles.subContainer}>
            <Text>Terms & Conditions</Text>

            <svg
              width="1"
              height="20"
              viewBox="0 0 1 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.5"
                y1="2.18557e-08"
                x2="0.499999"
                y2="20"
                stroke="#262626"
              />
            </svg>

            <Text>Privacy Policy</Text>
          </HStack>

          <Text className={styles.text2}>
            © 2024 FutureTech. All rights reserved.
          </Text>
        </HStack>
      </div>
    </div>
  );
};

export default Footer;
