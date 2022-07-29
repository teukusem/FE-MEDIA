import React, { useEffect, useState } from "react";
import Card from "../component/Card/Card";
import MenuBar from "../component/Menu/Menu";
import { Pagination } from "antd";
import { useQuery } from "react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import currency from "currency.js";

function Home() {
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");
  const point = searchParams.get("point");
  const [listData, setListData] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    size: 4,
  });

  let { data, isLoading } = useQuery(["dataCache", pagination], async () => {
    const body = {
      page: pagination.page,
      size: pagination.size,
      type: type ? type.split(",") : [],
      point: point ? point.split(",") : [],
    };
    const response = await axios.post(`http://localhost:3000/lists`, body);
    return response.data.data;
  });

  useEffect(() => {
    if (data) {
      setListData(data.list);
      setPagination({
        page: data.page,
        size: data.size,
      });
    }
  }, [data]);

  const onChange = (page) => {
    setPagination({ ...pagination, page });
  };

  const typeMaping = (data) => {
    switch (data) {
      case "voucher":
        return {
          title: "Voucer",
          color: "#40a9ff",
        };
      case "product":
        return {
          title: "Products",
          color: "#fa8c16",
        };
      case "gift":
        return {
          title: "Gift",
          color: "#f5222d",
        };
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="container">
        <MenuBar />
        <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          {listData.map((item, index) => {
            return (
              <Card
                key={index}
                title={typeMaping(item.type).title}
                point={currency(item.point, {
                  style: "currency",
                  currency: "IDR",
                  symbol: "",
                  separator: ".",
                  precision: 0,
                }).format()}
                color={typeMaping(item.type).color}
                description={item.description}
              />
            );
          })}
        </div>
        <div style={{ paddingBottom: "10px" }}>
          <Pagination
            current={pagination.page}
            onChange={onChange}
            pageSize={pagination.size}
            total={data?.total_data}
            style={{ display: "flex", justifyContent: "center" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
