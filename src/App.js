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
    fetch("http://quotes.stormconsultancy.co.uk/random.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setQuotes(data.quote);
        setAuthor(data.author);
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
          New
        </button>
      </div>
    </div>
  );
}

export default App;
