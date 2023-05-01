async function getPosts() {
  const response = await fetch(
    "https://wildatrisk.dalene.digital/wp-json/wp/v2/animal"
  );
  const result = await response.json();
  result.forEach((result) => {
    console.log(result);
  });
}

getPosts();
