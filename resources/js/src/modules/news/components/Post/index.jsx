import React, { useState, useEffect } from "react";

import template from "@/assets/images/templates/post-main-img-template.png";

import "./post.scss";

export default function Post({
    title = "",
    descr = "",
    content = "",
    mainImage = ""
}) {
    return (
        <div className="post">
            <img src={mainImage} alt="" className="post__main-img" />
            <h1 className="post__title">{title}</h1>
            {descr
                .split("\n")
                .filter(p => p)
                .map((p, i) => (
                    <p className="post__descr" key={i}>
                        {p}
                    </p>
                ))}

            {/* <div className="post__images">
        {Array.from({ length: 3 }).map((_, i) => (
          <div className="post__images-item" key={i}>
            <img src={template} alt="" />
          </div>
        ))}
      </div> */}
            {/* {content.map((itm, i) => (
        <p key={i}>{itm}</p>
      ))} */}
        </div>
    );
}
