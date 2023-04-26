import { axiosConfig } from './config';

export const fetchImagesQuery = async (searchQuery, pageNumber) => {
  try {
    const response = await axiosConfig.get('', {
      params: { q: searchQuery, page: pageNumber },
    });
    const { hits, totalHits } = response.data;
    return { hits, totalHits };
  } catch (error) {
    throw new Error(`Error fetching images: ${error.message}`);
  }
};

export const normalizeFields = imagesArray =>
  imagesArray.map(({ largeImageURL, webformatURL, tags, id }) => ({
    largeImageURL,
    webformatURL,
    tags,
    id,
  }));
