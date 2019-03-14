const url = process.env.API_URL;

function translate({ text, from, to }) {
  try {
    return fetch(`${url}?text=${text}&source=${from}&target=${to}`).then(res =>
      res.text(),
    );
  } catch (e) {
    console.log(e);
  }
}

export default translate;
