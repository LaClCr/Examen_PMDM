export async function getData(word) {
  try {
    const response = await fetch(
      'https://api.deezer.com/search?q=' + word
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}