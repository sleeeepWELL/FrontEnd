const config = {
  // api: "http://3.35.208.142",
  test_api: "http://54.180.79.156",
  token : {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
  },
};

export { config };
