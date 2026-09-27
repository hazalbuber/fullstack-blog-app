import React, { useEffect, useState } from "react";
import { VStack, Icon, Text } from "@chakra-ui/react";
import { BsLayoutTextSidebar } from "react-icons/bs";
import style from "./MenuList.module.css";
import { useAppDispatch } from "../../../app/hook";
import { selectPosts, selectLoading } from "../../../features/postSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../../features/authSlice";
import { getToken } from "../../../app/utils";
import { useNavigate } from "react-router-dom";
import { listPost } from "../../../features/postThunk";
import { logOut } from "../../../features/authThunk";

const dashboardMenu = [
  { name: "Dashboard", route: "/new" },
  { name: "Home Page", route: "/" },
];

const blogMenuItems = ["Settings", "Logout"];

const MenuList = () => {
  const [activeMenu, setActiveMenu] = useState<{
    type: "dashboard" | "blog";
    index: number;
  }>({
    type: "dashboard",
    index: 0,
  });

  const dispatch = useAppDispatch();
  const token = useSelector(selectCurrentToken);
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (token || getToken()) {
      dispatch(listPost());
    }
  }, [dispatch, token]);

  const handleBlog = (index: number, postId: number) => {
    setActiveMenu({ type: "blog", index });
    navigate(`/blog-setting/${postId}`);
  };

  const handleSignOut = (item: string) => {
    if (item === "Logout") {
      dispatch(logOut());
      navigate("/login");
    } else if (item === "Settings") {
      navigate("/settings");
    }
  };

  const postsArray = Array.isArray(posts) ? posts : [];

  return (
    <>
      {/* Dashboard / Home Page */}
      <div className={style.container}>
        <VStack align="start">
          {dashboardMenu.map((item, index) => {
            const isActive =
              activeMenu?.type === "dashboard" && activeMenu.index === index;
            return (
              <div
                key={index}
                onClick={() => {
                  setActiveMenu({ type: "dashboard", index });
                  navigate(item.route);
                }}
                className={`${style.menuItem} ${
                  isActive ? style.activeItem : style.inactiveItem
                }`}
              >
                <Icon
                  as={BsLayoutTextSidebar}
                  className={style.icon}
                  color={isActive ? "#EDECFC" : "#02024E"}
                />
                <Text
                  className={isActive ? style.activeText : style.inactiveText}
                >
                  {item.name}
                </Text>
              </div>
            );
          })}
        </VStack>
        <div className={style.separator}></div>
      </div>

      {/* My Blogs */}
      <div className={style.container2}>
        <div className={style.sectionTitle}>
          <Text className={style.sectionText}>My Blogs</Text>
        </div>

        <VStack align="start">
          {loading ? (
            <Text className={style.text}>Loading...</Text>
          ) : postsArray.length === 0 ? (
            <Text className={style.text}>No posts found.</Text>
          ) : (
            postsArray.map((post, index) => {
              const isActive =
                activeMenu?.type === "blog" && activeMenu.index === index;

              return (
                <div
                  key={post.id}
                  onClick={() => handleBlog(index, post.id)}
                  className={`${style.menuItem} ${
                    isActive ? style.activeItem : style.inactiveItem
                  }`}
                >
                  <Icon
                    as={BsLayoutTextSidebar}
                    className={style.icon}
                    color={isActive ? "#EDECFC" : "#02024E"}
                  />
                  <Text
                    className={isActive ? style.activeText : style.inactiveText}
                  >
                    {post.title || "Untitled"}
                  </Text>
                </div>
              );
            })
          )}
        </VStack>
        <div className={style.separator}></div>
      </div>

      {/* Settings / Logout */}
      <div className={style.container3}>
        <VStack align="start">
          {blogMenuItems.map((item, index) => (
            <div
              key={index}
              className={style.menuItem}
              onClick={() => handleSignOut(item)}
            >
              <Icon
                as={BsLayoutTextSidebar}
                className={style.icon}
                color="#02024E"
              />
              <Text className={style.text}>{item}</Text>
            </div>
          ))}
        </VStack>
      </div>
    </>
  );
};

export default MenuList;
