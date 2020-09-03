import React, { useState, useEffect } from "react";

import template from "@/assets/images/templates/post-main-img-template.png";

import "./post.scss";

const titleTemplate = "Nostrud consequat duis ";
const descrTemplate = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
const contentTemplate = [
  `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,
  `Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
];

export default function Post({
  title = titleTemplate,
  descr = descrTemplate,
  content = contentTemplate,
  mainImage = ''
}) {
  return (
    <div className="post">
      <img src={mainImage} alt="" className="post__main-img" />
      <h1 className="post__title">{title}</h1>
      <p className="post__descr">{descr}</p>
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
