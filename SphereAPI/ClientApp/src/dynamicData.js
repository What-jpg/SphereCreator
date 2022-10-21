//let data = fetch('../package.json').then((json) => json.json()).then((data) => console.log(data)).catch(error => console.log(error));

let imgSrc = 'images';
let serverSrc = 'https://localhost:5001';
let DynamicData = { imgs: imgSrc, server: serverSrc };
export default DynamicData;