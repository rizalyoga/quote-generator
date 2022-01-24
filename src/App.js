import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, TelegramShareButton, TelegramIcon } from "react-share";

function App() {
  const [Quotes, setQuotes] = useState("");
  const [Author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  /* --------------------------------- VANTAJS -------------------------------- */
  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: myRef.current,
          THREE,
          // mouseControls: true,
          // touchControls: true,
          // gyroControls: false,
          minHeight: 300.0,
          minWidth: 300.0,
          // scale: 1.0,
          // scaleMobile: 1.0,
          // backgroundColor: 0x1f1f3c,
          // points: 20.0,
          // maxDistance: 26.0,
          // spacing: 13.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    getQuote();
  }, []);

  /* -------------------------------- FETCH API ------------------------------- */
  const getQuote = () => {
    /* ----------------------------------- OLD API---------------------------------- */
    // fetch("http://quotes.stormconsultancy.co.uk/random.json")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setQuotes(data.quote);
    //     setAuthor(data.author);
    //   });

    setLoading(true);
    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setTimeout(() => {
          setLoading(false);
        }, 300);
        const index = Math.round(Math.random() * (data.length - 1));
        setQuotes(data[index].text);
        setAuthor(data[index].author);
      });
  };

  return (
    <div className="container container-content" ref={myRef}>
      <div id="content" className="content">
        {loading ? (
          <div className="loadingio-spinner-dual-ring-q5h6gsnh5uf">
            <div className="ldio-2u06t6977yh">
              <div></div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <q id="quote" style={{ textAlign: "center" }}>
              {Quotes.length > 0 ? Quotes : "  "}
            </q>
            <p id="author" className="author">
              - {Author.length > 0 ? Author : "-"} -
            </p>
          </>
        )}

        <button className="btn" onClick={() => getQuote()}>
          New Quote
        </button>
      </div>
      <div className="share-btn">
        <FacebookShareButton style={{ paddingLeft: "5px" }} url={`otesapps-rizalyoga.netlify.app`} quote={`${Quotes} \n -${Author}- \n`} hashtag="quotes">
          <FacebookIcon size={36} round />
        </FacebookShareButton>

        <TwitterShareButton style={{ paddingLeft: "5px" }} url={`${Quotes} \n -${Author}- \n`} hashtags={["quotes", "quote", "katakatabijak"]}>
          <TwitterIcon size={36} round />
        </TwitterShareButton>

        <WhatsappShareButton style={{ paddingLeft: "5px" }} title={`${Quotes}`} separator=":: ">
          <WhatsappIcon size={36} round />
        </WhatsappShareButton>

        <TelegramShareButton style={{ paddingLeft: "5px" }} title={"Quotes"}>
          <TelegramIcon size={36} round />
        </TelegramShareButton>
      </div>
    </div>
  );
}

export default App;
