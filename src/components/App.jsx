import { useState } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';
import { Container } from './Container';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const total = countTotalFeedback();

  const countPositiveFeedbackPercentage = () => {
    return Math.round((good * 100) / total);
  };

  const onLeaveFeedback = e => {
    e.preventDefault();
    const { name } = e.target;
    switch (name) {
      case `good`:
        setGood(prev => prev + 1);
        break;
      case `neutral`:
        setNeutral(prev => prev + 1);
        break;
      case `bad`:
        setBad(prev => prev + 1);
        break;

      default:
        console.log(`There is no option for ${name}`);
        break;
    }
  };

  const options = { good, neutral, bad };

  return (
    <Container>
      <GlobalStyle />
      <FeedbackOptions
        options={Object.keys(options)}
        onLeaveFeedback={onLeaveFeedback}
      />
      {total ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
    </Container>
  );
};
