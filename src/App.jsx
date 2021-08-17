import axios from "axios";
import { useEffect, useState } from "react";
import { FaTwitter, FaTumblr, FaQuoteLeft } from "react-icons/fa";
import { getRandomQuotes, getRandomColor } from "./helper/randomizer";

const getQuotes = async () => {
  const url =
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
  const response = await axios.get(url);
  return response.data;
};

function App() {
  const [quotes, setQuotes] = useState([]);
  const [randomColor, setRandomColor] = useState(getRandomColor());
  const [randomQuotes, setRandomQuotes] = useState("");
  const [author, setAuthor] = useState("");
  
  useEffect(() => {
    let unmouted = true;
    if (unmouted) {
      getQuotes().then((data) => {
        setQuotes(data?.quotes);
        const result = getRandomQuotes(data?.quotes);
        setRandomQuotes(result?.quote);
        setAuthor(result?.author);
      });
    }
    return () => (unmouted = false);
  }, []);

  const handleNewQoute = () => {
    const data = getRandomQuotes(quotes);
    setRandomQuotes(data.quote);
    setAuthor(data.author);
    const random = getRandomColor();
    setRandomColor(random);
  };
  const urlTweets = `https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(
    randomQuotes + "-" + author
  )}
`;
  return (
    <div
      id="wrapper"
      className="d-flex"
      style={{
        backgroundColor: randomColor,
        height: "100vh",
      }}
    >
      <div
        id="quote-box"
        className=" d-table h-auto p-5 rounded bg-white m-auto"
        style={{
          width: "600px",
        }}
      >
        <div className="quote-text p-2 bd-highlight text-center">
          <span>
            <i
              style={{
                color: randomColor,
                fontSize: "1.70em",
                marginRight: "0.4em",
              }}
            >
              <FaQuoteLeft />
            </i>
          </span>
          <span id="text" style={{ color: randomColor, fontSize: "1.75em" }}>
            {randomQuotes}
          </span>
        </div>

        <div className="quote-author">
          <p
            id="author"
            className="text-end my-3 p-1"
            style={{ color: randomColor }}
          >
            - {author}
          </p>
        </div>

        <div className="buttons">
          <a
            id="tweet-quote"
            href={urlTweets}
            target="_blank"
            rel="noreferrer"
            className="text-white p-2 rounded m-1 d-flex align-items-center float-start"
            style={{ backgroundColor: randomColor, fontSize: "1.5em" }}
          >
            <FaTwitter className="align-middle" />
          </a>

          <a
            href="/"
            className="text-white p-2 rounded m-1 d-flex align-items-center float-start"
            style={{ backgroundColor: randomColor, fontSize: "1.5em" }}
          >
            <FaTumblr />
          </a>

          <button
            id="new-quote"
            className="btn text-white float-right m-1 d-flex align-items-center float-end"
            style={{
              backgroundColor: randomColor,
              fontSize: "1em",
              height: "40px",
            }}
            onClick={handleNewQoute}
          >
            New quote
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
