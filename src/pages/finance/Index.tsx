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
  const [invoiceId, setInvoiceId] = useState<number | null>(null);
  if(invoiceId === null) return (
    <>
      <Tabs
        variant={variant}
        selectedTab={selectedTab}
        setselectedTab={setselectedTab}
      />
      <HeaderCards variant={variant} />
      <Header variant={variant} tab={selectedTab.toString()} />
      {selectedTab === "Projects" && <ProjectTable setInvoiceId={setInvoiceId} />}
      {selectedTab === "All Invoices" && <Table setInvoiceId={setInvoiceId} invoiceType='All'/>}
      {selectedTab === "Recieved Invoices" && <Table setInvoiceId={setInvoiceId} invoiceType='Recieved'/>}
      {selectedTab === "Pending Invoices" && <Table setInvoiceId={setInvoiceId} invoiceType='Pending'/>}
      {selectedTab === "Overdue Invoices" && <Table setInvoiceId={setInvoiceId} invoiceType='Overdue'/>}
    </>
  );
  if(invoiceId !== null) return <InvoiceGenerator invoiceId={invoiceId} setInvoiceId={setInvoiceId} />
};

export default Index;
