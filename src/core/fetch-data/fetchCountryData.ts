const fetchCountryData = async () => {
  try {
    const response = await fetch('./data.json');

    if (!response.ok) {
      console.error(`Error data loading: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error reading data.json:', error);
    throw error;
  }
};

export default fetchCountryData;
