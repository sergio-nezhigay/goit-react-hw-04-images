import { useState, useEffect, useMemo } from 'react';
import { TailSpin } from 'react-loader-spinner';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { fetchImagesQuery, normalizeFields } from '../api/pixabayApi';
import { Container, SearchBar, ImageGallery } from 'components';
import { Button, LoadingOverlay } from './App.styled';
import { useSearch } from '../hooks/searchContext';

import React from 'react';

export function App() {
  const { searchText, setSearchText } = useSearch();

  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  const [cache, setCache] = useState({});

  const cacheKey = useMemo(
    () => `${searchText}_${currentPage}`,
    [searchText, currentPage]
  );

  useEffect(() => {
    if (!searchText) return;
    if (cache[cacheKey]) {
      setImages(cache[cacheKey].images);
      setTotalHits(cache[cacheKey].totalHits);
    } else {
      (async () => {
        setLoading(true);
        try {
          const fetchedData = await fetchImagesQuery(searchText, currentPage);
          const newImages = normalizeFields(fetchedData.hits);
          setImages(prevImages => [...prevImages, ...newImages]);
          setTotalHits(fetchedData.totalHits);

          setCache(prevCache => ({
            ...prevCache,
            [cacheKey]: {
              images: [...images, ...newImages],
              totalHits: fetchedData.totalHits,
            },
          }));
        } catch (error) {
          NotificationManager.error('Error fetching images', error.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [currentPage, searchText, cache, cacheKey, images]);

  useEffect(() => {
    const screenheight = window.innerHeight;
    window.scrollBy(0, screenheight);
  }, [images]);

  const onSubmit = searchText => {
    setSearchText(searchText);
    setImages([]);
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
      {/* below lines show "0" when false if I don't use "!!" :(   */}
      {!!images.length && <ImageGallery images={images} />}
      {!!isButtonVisible && (
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
