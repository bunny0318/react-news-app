import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Card, CardColumns} from 'react-bootstrap';
import request from 'request';

const url = 'https://newsapi.org/v2/top-headlines?'
const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;
var articles = [];

function App() {

  const [ categoryChosen, setCategoryChosen ] = React.useState('');
  const [ search, setSearch ] = React.useState('');
  const [ clicked, toggleClicked ] = React.useState(false);

  function fetchArticles() {
    request(url + 'country=ph&category=' + categoryChosen + '&q=' + search + '&apikey=' + NEWS_API_KEY, { json: true }, (err, res, body) => {
      if(err) {
        return console.log(err);
      }
      articles = body.articles;
      console.log('articles: ', articles);
      toggleClicked(!clicked);
    });
  }

  function handleOptionChange(changeEvent) {
    setCategoryChosen(changeEvent.target.value);
  }

  function handleInputChange(changeEvent) {
    setSearch(changeEvent.target.value);
  }

  function handleFormSubmit(formSubmitEvent) {
    formSubmitEvent.preventDefault();
    toggleClicked(!clicked);
  }

  React.useEffect(() => {
    if(clicked) {
      fetchArticles();
    }
  }, [clicked]);

  return (
    <div className="App">

      <h3>Powered by <a href="https://newsapi.org">NewsAPI.org</a></h3>

      <label>Search Term: </label>
      <input type="text" value={search} onChange={handleInputChange}/>

      <form onSubmit={handleFormSubmit}>
        {/* Radio Buttons for Category */}
        <h3>Categories:</h3>
        <div className="row">
          <div className="col">
            <div className="radio">
              <input type="radio" value="" checked={categoryChosen === ''} onChange={handleOptionChange}/>
              <label>
                All
              </label>
            </div>
          </div>
          <div className="col">
            <div className="radio">
              <input type="radio" value="business" checked={categoryChosen === 'business'} onChange={handleOptionChange}/>
              <label>
                Business
              </label>
            </div>
          </div>
          <div className="col">
            <div className="radio">
              <input type="radio" value="entertainment" checked={categoryChosen === 'entertainment'} onChange={handleOptionChange}/>
              <label>
                Entertainment
              </label>
            </div>
          </div>
          <div className="col">
            <div className="radio">
              <input type="radio" value="health" checked={categoryChosen === 'health'} onChange={handleOptionChange}/>
              <label>
                Health
              </label>
            </div>
          </div>
          <div className="col">
            <div className="radio">
              <input type="radio" value="science" checked={categoryChosen === 'science'} onChange={handleOptionChange}/>
              <label>
                Science
              </label>
            </div>
          </div>
          <div className="col">
            <div className="radio">
              <input type="radio" value="sports" checked={categoryChosen === 'sports'} onChange={handleOptionChange}/>
              <label>
                Sports
              </label>
            </div>
          </div>
          <div className="col">
            <div className="radio">
              <input type="radio" value="technology" checked={categoryChosen === 'technology'} onChange={handleOptionChange}/>
              <label>
                Technology
              </label>
            </div>
          </div>
        </div>
        <button className="btn btn-default" type="submit">Search</button>
      </form>

      { (articles) ? 
        <CardColumns>
          { articles.map((article, index) => (
            (article.source.name !== 'Youtube.com') ?
              <Card key={index}>
                  <Card.Img variant="top" src={article.urlToImage} alt="headline"></Card.Img>
                  <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>
                      {article.source.name}({article.author || 'No author'})
                      <br/><br/>
                      {article.content}
                    </Card.Text>
                    <Card.Link href={article.url} target="_blank">Read More</Card.Link>
                  </Card.Body>
                  <Card.Footer className="text-muted">{Date(article.publishedAt)}</Card.Footer>
                </Card>
                : null
            ))
          }
        </CardColumns>
        : <p>No articles found</p> }
    </div>
  );
}

export default App;
