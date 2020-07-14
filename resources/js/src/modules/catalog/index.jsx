import React, { useState, useEffect, useContext } from "react";
import SearchInput from "@/components/SearchInput";

import { HeaderContext } from "@/context/header";
import BottleCard from "@/components/BottleCard";
import Button from "@/components/Button";
import AdvancedFilters from "./components/AdvancedFiltering";
import Filtering from "./components/Filtering";
import useMeasures from "@/utils/useMeasures";

import "./catalog.scss";

const CatalogPage = (_) => {
  const { isMobile } = useMeasures();
  const { setComponent } = useContext(HeaderContext);
  const [filtersVisibility, setFiltersVisibility] = useState(false);

  const onInputChange = (_) => console.log(_.target.value);

  useEffect((_) => {
    setComponent((_) => <SearchInput onChange={onInputChange} />);
  }, []);

  useEffect(
    (_) => {
      setFiltersVisibility(!isMobile);
    },
    [isMobile]
  );
  useEffect(
    (_) => {
      document.body.style.position =
        filtersVisibility && isMobile ? "fixed" : "static";
    },
    [filtersVisibility, isMobile]
  );

  return (
    <div className="catalog">
      <div className="container">
        {isMobile && (
          <div className="catalog-filters-handler">
            <Button onClick={(_) => setFiltersVisibility(true)}>Фильтры</Button>
          </div>
        )}
        <AdvancedFilters />
        <div className="container-grid">
          <aside hidden={!filtersVisibility}>
            <Filtering onClose={(_) => setFiltersVisibility(false)} />
          </aside>
          <div className="catalog-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <BottleCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
