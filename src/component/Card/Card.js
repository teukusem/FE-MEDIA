import React from "react";
import { Button } from "antd";

function Card(props) {
  return (
    <>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            type="primary"
            style={{
              borderRadius: "10px",
              border: "none",
              backgroundColor: props.color,
              width: "85px",
            }}
          >
            {props.title}
          </Button>
        </div>
        <span className="cardBottom">{props.point}</span>
      </div>
      <p className="giftCard">{props.description}</p>
    </>
  );
}

export default Card;
