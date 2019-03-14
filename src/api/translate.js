const url = process.env.API_URL;

async function translate({ text, from, to }) {
  try {
    const response = await fetch(
      `${url}?text=${text}&source=${from}&target=${to}`,
    ).then(res => res.text());
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export default translate;
