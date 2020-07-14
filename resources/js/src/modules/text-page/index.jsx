import React, { useState, useEffect } from "react";

import teamplate from "@/assets/images/templates/static-page-template.png";

import "./text-page.scss";

export default function StaticPage() {
  return (
    <div className="static-page">
      <img src={teamplate} alt="" className="static-page__main-img" />
      <div className="container">
        <h1 className="static-page__title">Nostrud consequat duis </h1>
        {Array.from({ length: 5 }).map((_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
            recusandae nesciunt aliquid impedit odio cupiditate minima
            veritatis, perspiciatis sapiente laborum, cumque sint inventore eum
            dicta adipisci atque libero ratione. Neque beatae facere voluptates
            alias? Error delectus doloribus eligendi ea nostrum. Ea dolorem quia
            cumque nihil repellat iste officiis placeat tempora?
          </p>
        ))}
      </div>
    </div>
  );
}
