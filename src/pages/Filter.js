import React, { useState, useMemo, useEffect } from "react";
import { Col, Row, Slider, Checkbox, Button } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsFillXCircleFill } from "react-icons/bs";
import currency from "currency.js";

const defaultTypeKey = ["product", "gift", "voucher"];
const maxPoint = 2000000;
const minPoint = 5000;

function Filter() {
  const navigate = useNavigate();
  const [type, setType] = useState([]);
  const [point, setPoint] = useState([]);

  const isCheckedAll = useMemo(() => {
    if (type.length === defaultTypeKey.length) return true;
    return false;
  }, [type]);

  const handleSubmit = () => {
    navigate(`/home?type=${type}&point=${point}`);
  };

  const handleClearFilter = () => {
    setType([]);
    setPoint([]);
  };

  const handleChangeType = (event) => {
    const { checked, value } = event.target;

    if (checked) {
      return setType([...type, value]);
    }
    const filteredType = type.filter((item) => item !== value);
    return setType(filteredType);
  };
  const handleCheckAll = (event) => {
    const { checked, value } = event.target;

    if (checked) return setType(defaultTypeKey);
    return setType([]);
  };

  const handleChangePoint = (range) => {
    setPoint(range);
  };

  return (
    <div className="container">
      <Row>
        <Col span={12}>
          <h1>Filter</h1>
        </Col>
        <Col
          span={12}
          style={{ marginTop: "10px", display: "flex", justifyContent: "end" }}
        >
          <AiOutlineClose size={25} onClick={() => navigate("/home")} />
        </Col>
      </Row>

      {/* Tag Label Component */}
      <div>
        {point.length > 0 && (
          <p className="tagLabel">
            {`Poin : ${point[0]} - ${point[1]}`}
            <span style={{ paddingLeft: "4px" }} onClick={() => setPoint([])}>
              <BsFillXCircleFill size={12} />
            </span>
          </p>
        )}

        {type.length > 0 && (
          <p className="tagLabel">
            {`Type : ${type}`}
            <span style={{ paddingLeft: "4px" }} onClick={() => setType([])}>
              <BsFillXCircleFill size={12} />
            </span>
          </p>
        )}

        {(type.length > 0 || point.length > 0) && (
          <p className="tagLabel" onClick={handleClearFilter}>
            Clear All Filter
          </p>
        )}
      </div>

      {/* Slider Money Component */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Point Needed</h3>
        <Row>
          <Col span={12}>
            <p className="money">{`IDR ${currency(point[0] || minPoint, {
              style: "currency",
              currency: "IDR",
              symbol: "",
              separator: ".",
              precision: 0,
            }).format()}`}</p>
          </Col>
          <Col span={12} style={{ display: "flex", justifyContent: "end" }}>
            <p className="money">{`IDR ${currency(point[1] || maxPoint, {
              style: "currency",
              currency: "IDR",
              symbol: "",
              separator: ".",
              precision: 0,
            }).format()}`}</p>
          </Col>
        </Row>
        <Slider
          defaultValue={[minPoint, maxPoint]}
          max={maxPoint}
          min={minPoint}
          range={true}
          step={minPoint}
          onChange={handleChangePoint}
        />
      </div>

      {/* Checkbox Component */}
      <div key={type}>
        <h3>Awards Type</h3>
        <Checkbox
          key={isCheckedAll}
          checked={isCheckedAll}
          onChange={handleCheckAll}
        >
          <p>All Type</p>
        </Checkbox>
        <br />
        <Checkbox
          value="product"
          checked={type.includes("product")}
          onChange={handleChangeType}
        >
          <p>Products</p>
        </Checkbox>
        <br />
        <Checkbox
          value="voucher"
          checked={type.includes("voucher")}
          onChange={handleChangeType}
        >
          <p>Vouchers</p>
        </Checkbox>
        <br />
        <Checkbox
          value="gift"
          checked={type.includes("gift")}
          onChange={handleChangeType}
        >
          <p>Gift</p>
        </Checkbox>
      </div>
      <Button type="primary" block onClick={handleSubmit}>
        Filter
      </Button>
    </div>
  );
}

export default Filter;
