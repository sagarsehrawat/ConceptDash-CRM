import React, { useState } from "react";
import Tabs from "./sections/Tabs/Tabs";
import HeaderCards from "./sections/HeaderCards/HeaderCards";
import Table from "./sections/Table/Table";
import Header from "./sections/Header/Header";
import InvoiceGenerator from "./sections/InvoiceGenerator/InvoiceGenerator";
import ProjectTable from "./sections/ProjectTable/ProjectTable";

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
      {selectedTab === "Projects" && <ProjectTable setpage={setpage} />}
      {selectedTab === "Recieved" && <Table setpage={setpage} invoiceType='Recieved'/>}
      {selectedTab === "Pending" && <Table setpage={setpage} invoiceType='Pending'/>}
      {selectedTab === "Overdue" && <Table setpage={setpage} invoiceType='Overdue'/>}
    </>
  );
  if(page === "INVOICE_GENERATOR") return <InvoiceGenerator setpage={setpage} />
};

export default Index;
