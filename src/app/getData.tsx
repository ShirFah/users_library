export const fetchUserData = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=10');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data.results; 
    } catch (error) {
      throw new Error('Failed to fetch data!');
    }
  };