import CardPatient from "@src/containers/CardPatient";
import CardToken from "@src/containers/CardToken";
import { fetchProducts } from "@src/service";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function ListProduct() {
  const [data, setData] = useState([]);
  const history = useHistory();
  //   const data = [{}, {}, {}, {}, {}, {}];
  const onClick = (item) => () => {
    history.push("/market/bill/" + item.code);
  };
  const getListProduct = async () => {
    fetchProducts()
      .then((res) => {
        const list = (res || []).sort((a, b) => a.value - b.value);
        setData(list);
      })
      .catch((e) => {
        console.log(e, "e?");
      });
  };
  useEffect(() => {
    getListProduct();
  }, []);
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h1 className="mb-2">
            List <span className="text-primary text-uppercase">Token</span>
          </h1>
        </div>
        <div className="row g-3">
          {data.map((item, idx) => (
            <CardToken key={idx} {...item} isView onClick={onClick(item)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListProduct;
