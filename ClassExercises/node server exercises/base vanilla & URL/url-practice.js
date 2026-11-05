console.log("--- Exercise 4 ---");
const urlStr4 = 'http://localhost:3000/users/list?role=admin&active=true#top';
const myUrl4 = new URL(urlStr4);
console.log(`Hostname: ${myUrl4.hostname}`);
console.log(`Pathname: ${myUrl4.pathname}`);
console.log(`Protocol: ${myUrl4.protocol}`);
console.log(`Query: ${myUrl4.search}`);
console.log(`Hash: ${myUrl4.hash}`);

console.log("\n--- Exercise 5 ---");
const urlStr5 = 'https://site.com/products?id=15&type=book&lang=en';
const myUrl5 = new URL(urlStr5);
console.log(`ID: ${myUrl5.searchParams.get('id')}`);
console.log(`Type: ${myUrl5.searchParams.get('type')}`);
console.log(`Language: ${myUrl5.searchParams.get('lang')}`);

console.log("\n--- Exercise 6 ---");
const urlStr6 = 'https://app.com/search?query=node&sort=asc';
const myUrl6 = new URL(urlStr6);
myUrl6.searchParams.set('sort', 'desc');
myUrl6.searchParams.append('page', '3');
myUrl6.searchParams.delete('query');
console.log(myUrl6.toString());