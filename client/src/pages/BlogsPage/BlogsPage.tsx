import React from "react";
import styles from "./BlogsPage.module.css";
//import { useNavigate } from "react-router-dom";
import BlogHeader from "../../components/BlogHeader/BlogHeader";
import FeaturedPost from "../../components/FeaturedPost/FeaturedPost";
import CardGrid from "../../components/BlogCard/CardGrid";
import Navbar from "../../components/Organisms/Navbar/Navbar";
import PaginationRoot from "../../components/Pagination/Pagination";
import Footer from "../../components/Organisms/Footer/Footer";

const HomePage = () => {

  return (
    <div className={styles.blogsPage}>
      <Navbar></Navbar>
      <BlogHeader></BlogHeader>
      <FeaturedPost></FeaturedPost>
      <CardGrid></CardGrid>
      <PaginationRoot></PaginationRoot>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
