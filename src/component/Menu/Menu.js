import { Drawer } from "antd";
import React, { useState } from "react";
import { AiOutlineAlignLeft, AiOutlineAlignRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Stars from "../../assets/Image/stars.png";

const MenuBar = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div className="header">
        <AiOutlineAlignLeft onClick={showDrawer} size="25px" />
        <h2>Awards</h2>
        <AiOutlineAlignRight size="25px" onClick={() => navigate("/filter")} />
      </div>

      <Drawer placement="left" width={250} onClose={onClose} visible={visible}>
        <img src={Stars} width="130px" />
        <h3>Awards Menu</h3>
        <p className="menuBar" onClick={() => navigate("/home")}>
          Home
        </p>
        <p className="menuBar">Cards</p>
        <p className="menuBar">Profile</p>
        <p className="menuBar" onClick={() => navigate("/")}>
          Logout
        </p>
      </Drawer>
    </>
  );
};

export default MenuBar;
