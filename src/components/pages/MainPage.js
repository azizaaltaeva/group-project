import React from "react";
import ItemsContext from "../../contexts/ItemsContext";
import Content from "../Content/Content";

import MainLayout from "../layouts/MainLayout";

const MainPage = () => {
  return (
    <MainLayout>

      <Content />
    </MainLayout>
  );
};

export default MainPage;
