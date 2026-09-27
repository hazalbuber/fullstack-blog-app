import React, { useEffect } from "react";
import {
  HStack,
  Input,
  InputGroup,
  Icon,
  Avatar,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosArrowDropdown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../app/store";
import { getUser } from "../../../features/authThunk";  

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.navbar}>
      <div className={styles.inputWrapper}>
        <svg
          width="24"
          height="26"
          viewBox="0 0 24 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g opacity="0.898019">
            <path
              d="M3.75 7.0625H20.25V8.4375H3.75V7.0625ZM3.75 12.5625H20.25V13.9375H3.75V12.5625ZM3.75 18.0625H20.25V19.4375H3.75V18.0625Z"
              fill="#676795"
            />
          </g>
        </svg>

        <InputGroup startElement={<FiSearch />}>
          <Input placeholder="Search" />
        </InputGroup>
      </div>

      <div className={styles.navbarRightSection}>
        <HStack>
          {/* Notification */}
          <Icon as={FaBell} boxSize={6} />

          {/* Language Selector */}
          <HStack cursor="pointer">
            <img
              src="https://flagcdn.com/w40/gb.png"
              alt="English"
              style={{ width: "24px", borderRadius: "6px" }}
            />
            <Text color="gray.600" fontWeight="medium">
              English
            </Text>
            <RiArrowDropDownLine />
          </HStack>

          {/* User */}
          <HStack gap="4">
            <Avatar.Root>
              <Avatar.Fallback />
              <Avatar.Image src="/avatar-placeholder.png" />
            </Avatar.Root>
            <Stack gap="0">
              <Text fontWeight="medium">
                {user?.name} {user?.surname}
              </Text>
              <Text color="gray.500" fontSize="sm">
                {user?.role}
              </Text>
            </Stack>
            <IoIosArrowDropdown />
          </HStack>
        </HStack>
      </div>
    </div>
  );
};

export default Navbar;
