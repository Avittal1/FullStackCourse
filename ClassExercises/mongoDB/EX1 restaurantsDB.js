//part a: 01_basic_projections_and_paging
// 1. Display all documents in the collection restaurants
db.restaurants.find({});

// 2. Display restaurant_id, name, borough and cuisine for all documents
db.restaurants.find(
  {},
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);

// 3. Display restaurant_id, name, borough and cuisine, excluding _id
db.restaurants.find(
  {},
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);

// 4. Display restaurant_id, name, borough and zip code, excluding _id
db.restaurants.find(
  {},
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, "address.zipcode": 1 }
);

// 5. Display all restaurants in the borough Bronx
db.restaurants.find({ borough: "Bronx" });

// 6. Display the first 5 restaurants in the borough Bronx
db.restaurants.find({ borough: "Bronx" }).limit(5);

// 7. Display the next 5 restaurants after skipping first 5 in the borough Bronx
db.restaurants.find({ borough: "Bronx" }).skip(5).limit(5);

