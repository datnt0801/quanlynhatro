import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./component/card/card";

function App() {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(1000000);
  const [open, setOpen] = useState(false);
  const [daynha, setDaynha] = useState([]);
  const [nha, setNha] = useState([]);
  const [buttonDay, setButtonDay] = useState("Dãy");
  const BASE_URL = "http://localhost:8080/api";
  const handleOnChangeFrom = (event) => {
    setFrom(event.target.value);
    console.log(from);
  };
  const handleOnChangeTo = (event) => {
    setTo(event.target.value);
    console.log(to);
  };

  const handleOnClickPrice = (event) => {
    console.log("final: ", from, to);
    console.log("nha final: ", nha);
    getNhaByPrice(from, to);
  };
  const handleOnClickDay = (event) => {
    setOpen(!open);
    // console.log(event.target.id);
    console.log("usestate: ", daynha);
  };

  const handleOnClickDayNha = (event) => {
    setOpen(!open);
    getNhaByDayNha(event.target.id);
    setButtonDay(event.target.value);
  };

  const getNhaByDayNha = async (id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/searchByDayNha`,
        JSON.stringify({ id: id }),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setNha(res.data);
      console.log("Nha: ", res.data);
    } catch (e) {
      console.log("error getNhaByDayNha:", e);
    }
  };

  const getNhaByPrice = async (min, max) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/searchByPrice`,
        JSON.stringify({ min: min, max: max }),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setNha(res.data);
      console.log("Nha: ", res.data);
    } catch (e) {
      console.log("error getNhaByPrice:", e);
    }
  };

  const getDayNha = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/days`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({id: "dn1"})
      });
      setDaynha(res.data);
      console.log(res.data);
    } catch (e) {
      console.log("error getDayNha:", e);
    }
  };

  useEffect(() => {
    getDayNha();
  }, []);

  useEffect(() => {
    getDayNha();
  }, [nha]);

  return (
    <div className="App">
      <header>
        <div className="topnav">
          <div>
            <a className="active" href="#home">
              Home
            </a>
            <a href="https://www.youtube.com/">News</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
          </div>
        </div>
      </header>

      <div className="body">
        <div className="search">
          <div className="price">
            <p>Từ</p>
            <input
              type="number"
              placeholder={from}
              value={from}
              onChange={handleOnChangeFrom}
            />
            <p>đến</p>
            <input
              type="number"
              placeholder={to}
              value={to}
              onChange={handleOnChangeTo}
            />

            <button type="button" onClick={handleOnClickPrice}>
              Tìm kiếm
            </button>
          </div>
          <div className="row">
            <div className="dropdown">
              <button id="id button" onClick={handleOnClickDay}>
                {buttonDay}
              </button>
              {open ? (
                <ul className="menu">
                  {daynha.map((e) => {
                    return (
                      <li className="menu-item">
                        <button
                          id={e.iddaynha}
                          type="button"
                          value={e.ten}
                          onClick={handleOnClickDayNha}
                        >
                          {e.ten}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
        <div className="result">
          {nha.map((e) => {
            return <Card nha={e} />;
          })}
        </div>
      </div>

      <div className="footer-basic">
        <footer>
          <div className="social">
            <a href="#">
              <i className="icon ion-social-instagram"></i>
            </a>
            <a href="#">
              <i className="icon ion-social-snapchat"></i>
            </a>
            <a href="#">
              <i className="icon ion-social-twitter"></i>
            </a>
            <a href="#">
              <i className="icon ion-social-facebook"></i>
            </a>
          </div>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="#">Home</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Services</a>
            </li>
            <li className="list-inline-item">
              <a href="#">About</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Terms</a>
            </li>
            <li className="list-inline-item">
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
          <p className="copyright">Company Name © 2018</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
