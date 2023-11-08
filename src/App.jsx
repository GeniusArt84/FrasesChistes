import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Card, Spinner, ButtonGroup } from 'react-bootstrap';

const App = () => {
 const [jokequote, setJokeQuote] = useState('');
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);
 const [tittle, setTittle] = useState('');
 const [color, setColor] = useState('');

 const getJoke = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
      });
      setJokeQuote(response.data.joke);
      setTittle('Joke')
      setColor('success')
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
 };

 const getQuote = async () => {
  try {
    setLoading(true);
    const response = await axios.get('https://quote-garden.onrender.com/api/v3/quotes/random', {
      headers: { Accept: 'application/json' },
    });
    setJokeQuote(response.data.data[0].quoteText);
    setTittle('Quote')
    setColor('primary')
    setError(null);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  getJoke();
  getQuote();
}, []);

 return (
    <div className="App">
      <Container fluid>
        <Row className="text-center">
          <h1>Jokes & Quotes from API</h1>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Card border={color}>
              <Card.Body>
              <Card.Title className="text-center"><h1>Random {tittle}</h1></Card.Title>
              <Card.Text className="text-center">
                  {loading ? (
                  <Spinner animation="border"/>
                  ) : error ? (
                    <p>Error: {error}</p>
                  ) : (
                    <p>{jokequote}</p>
                  )}
              </Card.Text>
              </Card.Body>
              <ButtonGroup aria-label="Basic example">
                <Button variant="primary" onClick={getQuote}>Get Another Quote</Button>
                <Button variant="success" onClick={getJoke}>Get Another Joke</Button>
              </ButtonGroup>
            </Card>
          </Col>
          <Col></Col>
        </Row>
        <Row></Row>
      </Container>
    </div>
 );
};

export default App;
