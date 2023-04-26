import { useState, useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { fetchImagesQuery, normalizeFields } from '../api/pixabayApi';
import { Container, SearchBar, ImageGallery } from 'components';
import { Button, LoadingOverlay } from './App.styled';

import React from 'react';

export function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (searchText) {
      (async () => {
        setLoading(true);
        try {
          const fetchedData = await fetchImagesQuery(searchText, currentPage);
          const images = normalizeFields(fetchedData.hits);
          setTotalHits(fetchedData.totalHits);
          setImages(prevImages => [...prevImages, ...images]);
        } catch (error) {
          NotificationManager.error('Error fetching images', error.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [currentPage, searchText]);

  useEffect(() => {
    const screenheight = window.innerHeight;
    window.scrollBy(0, screenheight);
  }, [images]);

  const onSubmit = searchText => {
    setImages([]);
    setSearchText(searchText);
    setCurrentPage(1);
    setTotalHits(0);
  };

  const onLoadMoreClick = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
  };

  const isButtonVisible = images.length && totalHits > images.length;

  return (
    <Container>
      <SearchBar onSubmit={onSubmit} />

      {images.length && <ImageGallery images={images} />}

      {isButtonVisible && (
        <Button type="button" onClick={onLoadMoreClick}>
          Load more
        </Button>
      )}
      {isLoading && (
        <LoadingOverlay>
          <TailSpin color="#3f51b5" height={100} width={100} />
        </LoadingOverlay>
      )}
      <NotificationContainer />
    </Container>
  );
}
