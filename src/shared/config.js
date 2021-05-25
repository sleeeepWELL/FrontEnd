const config = {
  api: "https://wanjongth.shop",
  token: {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  },
};

export { config };
