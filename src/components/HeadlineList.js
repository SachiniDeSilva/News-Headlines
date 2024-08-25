// src/components/HeadlineList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Typography, Card, CardContent, CardMedia, Button } from '@mui/material';

const API_KEY = 'YOUR_NEWS_API_KEY';
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

const HeadlineList = () => {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setHeadlines(response.data.articles);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching the headlines:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      {headlines.map((headline, index) => (
        <Card key={index} sx={{ display: 'flex', marginBottom: 2 }}>
          {headline.urlToImage && (
            <CardMedia
              component="img"
              sx={{ width: 150 }}
              image={headline.urlToImage}
              alt={headline.title}
            />
          )}
          <CardContent>
            <Typography variant="h6">{headline.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {headline.source.name} - {new Date(headline.publishedAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">{headline.author}</Typography>
            <Typography variant="body1">{headline.description}</Typography>
            <Button variant="contained" component={Link} to={`/headline/${index}`} sx={{ marginTop: 1 }}>
              Read More
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default HeadlineList;
