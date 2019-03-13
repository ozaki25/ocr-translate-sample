const url = process.env.MOCK_API_URL;

async function translate({ text, from, to }) {
  try {
    console.log(`${url}/translate?text=${text}&source=${from}&target=${to}`);
    const response = await fetch(
      `${url}/translate?text=${text}&source=${from}&target=${to}`,
    ).then(res => res.json());
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export default translate;
