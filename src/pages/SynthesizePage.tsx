import React from "react";
import { useLoaderData } from "react-router-dom";

type Props = {
  title: string;
};
export const loader = async (): Promise<Props> => {
  await new Promise((r) => setTimeout(r, 100));
  return {
    title: "Tổng hợp",
  };
};

export const Component = () => {
  let { title } = useLoaderData() as Props;
  return <p>Phần nội dung của {title}</p>;
};
