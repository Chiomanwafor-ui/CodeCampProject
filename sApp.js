const { useState, useEffect } = React;

const quotes = [
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "Get busy living or get busy dying.", author: "Stephen King" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", author: "Martin Luther King Jr." },
  { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" }
];

const App = () => {
  const [quote, setQuote] = useState({ text: "", author: "" });

  useEffect(() => {
    getRandomQuote();
  }, []);
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  };

  const tweetQuote = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.text}" - ${quote.author}`)}`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <div id="quote-box">
    <div id="text">{quote.text}</div>
    <div id="author">{quote.author}</div>
      <button id="new-quote" onClick={getRandomQuote}>New Quote</button>
      <a 
        id="tweet-quote" 
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.text}" - ${quote.author}`)}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Tweet
      </a>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
