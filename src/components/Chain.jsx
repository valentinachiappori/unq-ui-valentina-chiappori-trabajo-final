import "../styles/Chain.css";

const Chain = ({ chain }) => {
  const reversedChain = [...chain].reverse();

  return (
    <div className="chain">
      {reversedChain.map((word, index) => (
        <span
          key={word}
          className={index === 0 ? "chain-word-last" : "chain-word"}
        >
          {word} <span className="chain-word-points">+{word.length}</span>
        </span>
      ))}
    </div>
  );
};

export default Chain;