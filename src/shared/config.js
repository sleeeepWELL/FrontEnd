const config = {
  // test
  // api: "http://54.180.79.156",

  //실제
  // api: "http://3.35.208.142",

  api: "https://wanjongth.shop",
  token: {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  },
};

export { config };
