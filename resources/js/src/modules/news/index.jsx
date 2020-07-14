import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import MainNewsCard from "./components/MainNewsCard";
import Post from "./components/Post";
import DetailsCard from "@/components/DetailsPageCard";
import Modal from "@/components/Modal";

import { history } from "@/index";

import wineSet from "@/assets/images/templates/wine-set.png";

import "./news.scss";

export default function News() {
  const [isPostVisible, setPostVisibility] = useState(false);
  const { search } = useLocation();
  useEffect(
    (_) => {
      setPostVisibility(search ? true : false);
    },
    [search]
  );

  const onClosePost = (_) => {
    history.push(location.pathname);
  };

  return (
    <div className="container">
      {isPostVisible && (
        <Modal onClose={onClosePost}>
          <Post />
        </Modal>
      )}
      <div className="news__main">
        <MainNewsCard />
      </div>
      <div className="news__grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <DetailsCard
            link={`?post=${i}`}
            key={i}
            image={wineSet}
            title={"Aute occaecat"}
            description={`An important white grape in Bordeaux and the Loire Valley that has now found fame in New Zealand and now Chile. `}
          />
        ))}
      </div>
    </div>
  );
}
