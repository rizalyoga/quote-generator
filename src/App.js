import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import load from "./assets/loading.gif";

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
    <div className="container" ref={myRef}>
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
              {Quotes}
            </q>
            <p id="author" className="author">
              - {Author} -
            </p>
          </>
        )}

        <button className="btn" onClick={() => getQuote()}>
          New Quote
        </button>
      </div>
    </div>
  );
}

export default App;
