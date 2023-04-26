import React, { Component } from 'react';
import { TailSpin } from 'react-loader-spinner';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import { fetchImagesQuery, normalizeFields } from '../api/pixabayApi';
import { Container, SearchBar, ImageGallery } from 'components';
import { Button, LoadingOverlay } from './App.styled';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    searchText: '',
    currentPage: 1,
    totalHits: 0,
  };

  componentDidUpdate = (_, prevState) => {
    if (
      prevState.currentPage !== this.state.currentPage ||
      prevState.searchText !== this.state.searchText
    ) {
      this.loadData();
    }
    if (prevState.images.length !== this.state.images.length) {
      const screenheight = window.innerHeight;
      window.scrollBy(0, screenheight);
    }
  };

  onSubmit = searchText => {
    this.setState({
      images: [],
      searchText: searchText,
      currentPage: 1,
      totalHits: 0,
    });
  };

  onLoadMoreClick = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  loadData = async () => {
    const { searchText, currentPage } = this.state;
    this.setState({ isLoading: true });
    try {
      const { hits, totalHits } = await fetchImagesQuery(
        searchText,
        currentPage
      );
      const images = normalizeFields(hits);
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...images],
          totalHits,
        };
      });
    } catch (error) {
      NotificationManager.error('Error fetching images', error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, totalHits } = this.state;
    const isButtonVisible = images.length && totalHits > images.length;

    return (
      <Container>
        <SearchBar onSubmit={this.onSubmit} />

        {images.length && <ImageGallery images={images} />}

        {isButtonVisible && (
          <Button type="button" onClick={this.onLoadMoreClick}>
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
}
