const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^"&?\/\s]{11})/;
console.log(regex.test("https://youtube.com/shorts/MEBOABZY4xc?si=ODGa_FurRtco428z"));
console.log(regex.test("https://youtu.be/iw5H9DizrP8?si=gZhk7nPZAgo-YdMU"));
