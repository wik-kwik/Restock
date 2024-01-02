export const formatCreateDate = (dateString) => {
    try {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      const formattedDate = new Date(dateString).toLocaleString(undefined, options);
  
      if (formattedDate !== 'Invalid Date') {
        return formattedDate;
      } else {
        throw new Error('Invalid date string');
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };
  