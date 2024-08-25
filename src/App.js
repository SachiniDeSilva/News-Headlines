import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import { Container, Button,Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';

function App() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  
  async function getNewsData() {
    setLoading(true);

    try {
      const resp = await axios.get(
        'https://newsapi.org/v2/everything?q=bitcoin&apiKey=78ec2d6940c84a9685f506c630192610&pageSize=10'
      );
      setNewsData(resp.data.articles);
    } catch (error) {
      console.error('Error fetching the news data:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNewsData();
  }, []);
  
  const handleLoadMore = () => {
    setPage(page + 1);
  };
  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <CircularProgress />
        ) : (
          <Container>
            <Grid container spacing={4} justifyContent="center">
              {newsData.map((newsItem, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <a target="_blank" href={newsItem.url} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Card>
                      {newsItem.urlToImage && (
                        <CardMedia component="img" height="200" image={newsItem.urlToImage} alt={newsItem.title} />
                      )}
                      <CardContent>
                        <Typography variant="h5" gutterBottom>
                          {newsItem.title}
                        </Typography>
                       
                        <Typography variant="body2" color="textSecondary">
                          {newsItem.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                      {newsItem.source.name} - {new Date(newsItem.publishedAt).toLocaleDateString()}
                    </Typography>
                        <Typography variant="body2" color="textSecondary">
                      {newsItem.author}
                    </Typography>
                      </CardContent>
                    </Card>
                  </a>
                </Grid>
              ))}
            </Grid>
          
      {loading && <CircularProgress />}
      {!loading && (
        <Button variant="contained" color="primary" onClick={handleLoadMore} style={{ marginTop: '20px' }}>
          Load More
        </Button>
      )}
          </Container>
        )}
      </header>
    </div>
  );
}

export default App;
