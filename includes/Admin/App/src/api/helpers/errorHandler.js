const errorHandler = (error, path) => {
  console.error(`API Error at ${path}:`, error.message || error);
};

export default errorHandler;
