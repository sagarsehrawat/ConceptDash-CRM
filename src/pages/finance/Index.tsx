import React, { useState } from "react";
import Tabs from "./sections/Tabs/Tabs";
import HeaderCards from "./sections/HeaderCards/HeaderCards";
import Table from "./sections/Table/Table";
import Header from "./sections/Header/Header";
import InvoiceGenerator from "./sections/InvoiceGenerator/InvoiceGenerator";

type Props = {
  variant: "AR" | "AP";
};

const Index = ({ variant }: Props) => {
  const [selectedTab, setselectedTab] = useState<string>("Projects");
  const [page, setpage] = useState<string>("DEFAULT");
  if(page === "DEFAULT") return (
    <>
      <Tabs
        variant={variant}
        selectedTab={selectedTab}
        setselectedTab={setselectedTab}
      />
      <HeaderCards variant={variant} />
      <Header variant={variant} tab={selectedTab.toString()} />
      <Table setpage={setpage}/>
    </>
  );
  if(page === "INVOICE_GENERATOR") return <InvoiceGenerator setpage={setpage} />
};

export default Index;
