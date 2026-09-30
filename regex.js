const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^"&?\/\s]{11})/;
console.log(regex.test("https://youtu.be/NhQQ1RPHwo8?si=UbJdOgKObfajL4lK"));
