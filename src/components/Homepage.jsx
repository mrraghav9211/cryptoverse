import React, { useState,useEffect } from "react";
import millify from "millify";
import { useSelector } from "react-redux";
import { Typography, Statistic} from "antd";
import { Select, Row, Col, Avatar, Card } from "antd";
import { Link } from "react-router-dom";
import moment from 'moment';
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';



const { Text, Title } = Typography;
const { Option } = Select;

const Homepage = () => {
  const [globalState, setglobalState] = useState([]);
  const [coins, setCoins] = useState([]);
  const [newsDetails, setNewsDetails] = useState([]);
  const data = useSelector((state) => state.dataDetails.data);
  const newsData = useSelector((state)=> state.newsData.data)
  
  setTimeout(() => {
    setglobalState(data[0].data.stats);
    setCoins(data[0].data.coins.filter((res)=> res.rank <= 10 ))
    setNewsDetails(newsData[0].value)
    
  },500);
  
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      {Object.keys(globalState).length > 0 && (
        <Row>
          <Col span={12}>
            <Statistic
              title="Total Cryptocurrencies"
              value={globalState.total}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Exchanges"
              value={globalState.totalExchanges}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Market Cap"
              value={`$${millify(globalState.totalMarketCap)}`}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total 24th Volume"
              value={`$${millify(globalState.total24hVolume)}`}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Markets"
              value={millify(globalState.totalMarkets)}
            />
          </Col>
        </Row>
      )}
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>

    {/* top 10 cryptocurrencies */}
    {Object.keys(coins).length > 0 && (
      <Row gutter={[32, 32]}  className="crypto-card-container">
        {coins.map((currency)=>(
        <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
          <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
            <Card
              title={`${currency.rank}. ${currency.name}`}
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
    )}
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">News</Link>
        </Title>
      </div>
      {Object.keys(newsDetails).length > 0 && (
      <Row gutter={[24, 24]}>
      {newsDetails.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.name}</Title>
                <img style={{maxWidth:'200px', maxHeight:'100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="" />
              </div>
              <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
      </Row>
      )}
    </>
  );
};

export default Homepage;
