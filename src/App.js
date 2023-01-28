import React, { useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  Homepage,
  Exchanges,
  News,
  CryptoDetails,
  Cryptocurrencies,
} from "./components";
import "./App.css";
import axios from "axios";
import { addDetails } from "./app/slice";
import { addNewsData } from "./app/searchSlice";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const categoty = useSelector((state) => state.newsData.category);
  const dispatch = useDispatch();
  const fetchApi = () => {
    const options = {
      method: "GET",
      url: "https://api.coinranking.com/v2/coins",
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
        dispatch(addDetails(response.data));
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchApi();
    const options = {
      method: "GET",
      url: `https://bing-news-search1.p.rapidapi.com/news/search?q=${categoty}`,
      params: {
        textFormat: "Raw",
        safeSearch: "Off",
        freshness: "Day",
        count: "10",
      },
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "64babb8ccdmsh02d0ecccfa77be5p1cc968jsn10b73d6bffc9",
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        dispatch(addNewsData(response.data));
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [categoty]);

  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Route exact path="/cryptocurrencies">
                <Cryptocurrencies />
              </Route>
              <Route exact path="/crypto/:coinId">
                <CryptoDetails />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
            </Switch>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Cryptoverse <br />
            All rights reserverd
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/exchanges">Exchanges</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
