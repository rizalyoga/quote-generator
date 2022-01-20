import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";

function App() {
  const [Quotes, setQuotes] = useState("");
  const [Author, setAuthor] = useState("");

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
          // minHeight: 200.0,
          // minWidth: 200.0,
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

    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const index = Math.round(Math.random() * (data.length - 1));
        setQuotes(data[index].text);
        setAuthor(data[index].author);
      });
  };

  return (
    <div className="container" ref={myRef}>
      <div id="content" className="content">
        <p id="quote" style={{ textAlign: "center" }}>
          {Quotes}
        </p>
        <p id="author" className="author">
          {Author}
        </p>
        <button className="btn" onClick={() => getQuote()}>
          New Quote
        </button>
      </div>
    </div>
  );
}

export default App;
