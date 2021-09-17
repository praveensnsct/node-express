// must keep next or error occurs
export default (err, req, res) => {
  // log stack in console for tracking purposes before we alter
  console.error(err);

  // return display message with status code
  res.status(500).json(err);
};
