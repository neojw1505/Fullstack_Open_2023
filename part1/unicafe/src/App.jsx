import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    const sum = updatedGood + neutral + bad;
    setTotal(sum);
    setAverage((updatedGood * 1 + bad * -1) / sum);
    setPositive(updatedGood / sum);
  };

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    const sum = good + updatedNeutral + bad;
    setTotal(sum);
    setAverage((good * 1 + bad * -1) / sum);
    setPositive(good / sum);
  };

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    const sum = good + neutral + updatedBad;
    setTotal(sum);
    setAverage((good * 1 + updatedBad * -1) / sum);
    setPositive(good / sum);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Statistics
        goodCount={good}
        neutralCount={neutral}
        badCount={bad}
        totalCount={total}
        positive={positive}
        average={average}
      />
    </div>
  );
};

const Statistics = (props) => {
  const { goodCount, neutralCount, badCount, totalCount, positive, average } =
    props;
  if (totalCount === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>
            <h1>Statistics</h1>
          </th>
        </tr>
      </thead>
      <tbody>
        <StatisticsLine text="good" value={goodCount} />
        <StatisticsLine text="neutral" value={neutralCount} />
        <StatisticsLine text="bad" value={badCount} />
        <StatisticsLine text="all" value={totalCount} />
        <StatisticsLine text="average" value={average} />
        <StatisticsLine text="positive" value={positive} />
      </tbody>
    </table>
  );
};

const StatisticsLine = (props) => {
  const { text, value } = props;
  if (text == "positive") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = (props) => {
  const { onClick, text } = props;
  return <button onClick={onClick}>{text}</button>;
};

export default App;
