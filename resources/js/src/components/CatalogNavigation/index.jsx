import React, { useState, useEffect, useRef, createElement } from "react";
import { Link } from "react-router-dom";

import useMeasures from "@/utils/useMeasures";

import InlineMode from "./components/InlineMode";
import ExpandableMode from "./components/ExpandableMode";

import { InlineMenu, WineCategories } from "./components/ExpanedVariants";

import { navigationItems } from "./static";

import "./catalog-navigation.scss";

const Variants = {
  common: InlineMenu,
  wine: WineCategories,
};

function CatalogNavigation() {
  const { isMobile } = useMeasures();
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedVariant, setExpandedVariant] = useState("common");

  useEffect(
    (_) => {
      isExpanded
        ? document.body.classList.add("fixed")
        : document.body.classList.remove("fixed");
    },
    [isExpanded]
  );

  return (
    <>
      <div className="container">
        {isMobile ? (
          <ExpandableMode items={navigationItems} />
        ) : (
          <InlineMode
            items={navigationItems}
            isExpanded={isExpanded}
            onChangeState={setIsExpanded}
            onChangeVariant={setExpandedVariant}
          />
        )}
      </div>
      {isExpanded && (
        <ExpandedContainer>
          {createElement(Variants[expandedVariant], { onChangeState: setIsExpanded })}
        </ExpandedContainer>
      )}
    </>
  );
}

function ExpandedContainer({ children }) {
  const popupRef = useRef(null);
  useEffect((_) => {
    const { current: container } = popupRef;
    container.style.maxHeight = `${window.innerHeight - container.offsetTop}px`;
  }, []);
  return (
    <div className="popup-content" ref={popupRef}>
      <div className="container">{children}</div>
    </div>
  );
}

export default CatalogNavigation;
