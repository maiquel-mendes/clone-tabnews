function status(request, response) {
  response.status(200).json({ message: "a resposta foi ok média" });
}

export default status;
