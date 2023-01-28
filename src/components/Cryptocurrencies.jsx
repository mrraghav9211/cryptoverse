import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import { Card, Row, Col, Input, Button } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";

const Cryptocurrencies = () => {
  const data = useSelector((state) => state.dataDetails.data);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [input, setInput] = useState("");
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.coinranking.com/v2/search-suggestions?query=${searchQuery}`,
      params: {
        limit: "50",
      },
      headers: {
        "X-RapidAPI-Key": "64babb8ccdmsh02d0ecccfa77be5p1cc968jsn10b73d6bffc9",
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        if (searchQuery === "") {
          setTimeout(() => {
            setCoins(data[0].data.coins);
          }, 500);
        } else {
          setCoins(response.data.data.coins);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [searchQuery]);

  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const handleBtn = () => {
    setSearchQuery(input);
    setInput("");
  };
  return (
    <>
      <div className="search-crypto" style={{ display: "flex" }}>
        <Input
          type="text"
          placeholder="Search CryptoCurrency"
          value={input}
          onChange={handleInput}
        />
        <Button onClick={handleBtn}>Search</Button>
      </div>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {coins.map((currency, idx) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${idx + 1}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)} </p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
