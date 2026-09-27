import React from "react";
import CardMolecules from "../Molecules/CardMolecules";

type BlogData = {
  id: number;
  title: string;
};

type Props = {
  blog: BlogData;
};

const BlogCard = ({ blog }: Props) => {
  return (
    <div>
      <CardMolecules blog={blog} />
    </div>
  );
};

export default BlogCard;
