import React from "react";
import AddProject from "../../forms/AddProposal";

type Props = {
  api: number;
  setApi: Function;
  show: boolean;
  setShow: Function;
};

const Header = ({ api, setApi, show, setShow }: Props) => {
  return (
    <>
      <div
        className="d-flex flex-row justify-content-between align-items-center"
        style={{ margin: "32px 24px 0px 32px" }}
      >
        <p className="heading-2">Proposal</p>
      </div>

      {show && (
        <AddProject api={api} setApi={setApi} onHide={() => setShow(false)} />
      )}
    </>
  );
};

export default Header;
