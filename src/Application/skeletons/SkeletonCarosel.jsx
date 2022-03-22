import React from "react";
import { Shimmer } from "./Shimmer";
import SkeletonElement from "./SkeletonElement";

export const SkeletonCarosel = () => {
  return (
    <div className="skeleton-wrapper">
      <div className="skeleton-carosel">
        <SkeletonElement type="carosel" />
        <SkeletonElement type="carosel" />
        <SkeletonElement type="carosel" />
      </div>
      <Shimmer />
    </div>
  );
};
