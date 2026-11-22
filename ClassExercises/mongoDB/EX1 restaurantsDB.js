//part a: 01 basic projections and paging
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


//02 comparisons and geo
// 8. Restaurants that achieved a score more than 90
db.restaurants.find({ "grades.score": { $gt: 90 } });

// 9. Restaurants that achieved a score more than 80 but less than 100
db.restaurants.find({
  grades: {
    $elemMatch: { score: { $gt: 80, $lt: 100 } }
  }
});

// 10. Restaurants located in latitude value less than -95.754168
// Note: address.coord is [longitude, latitude], so latitude is index 1
db.restaurants.find({ "address.coord.1": { $lt: -95.754168 } });

// 11. Not 'American' cuisine, grade score > 70, and latitude < -65.754168
db.restaurants.find({
  $and: [
    { cuisine: { $ne: "American " } },
    { "grades.score": { $gt: 70 } },
    { "address.coord.1": { $lt: -65.754168 } }
  ]
});

// 12. Same as 11 (longitude < -65.754168) WITHOUT using $and operator
// In MongoDB, implicit AND is achieved by separating conditions with commas
db.restaurants.find({
  cuisine: { $ne: "American " },
  "grades.score": { $gt: 70 },
  "address.coord.0": { $lt: -65.754168 }
});

// 13. Not 'American ', grade 'A', not in 'Brooklyn', sorted by cuisine descending
db.restaurants.find({
  cuisine: { $ne: "American " },
  "grades.grade": "A",
  borough: { $ne: "Brooklyn" }
}).sort({ cuisine: -1 });

//03_regex_and_logical_operators
// 14. Name starts with 'Wil' -> show restaurant_id, name, borough, cuisine
db.restaurants.find(
  { name: /^Wil/ },
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);

// 15. Name ends with 'ces' -> show restaurant_id, name, borough, cuisine
db.restaurants.find(
  { name: /ces$/ },
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);

// 16. Name contains 'Reg' somewhere -> show restaurant_id, name, borough, cuisine
db.restaurants.find(
  { name: /Reg/ },
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);

// 17. Belong to Bronx and prepared either American or Chinese dish
db.restaurants.find({
  borough: "Bronx",
  $or: [{ cuisine: "American " }, { cuisine: "Chinese" }]
});

// 18. Belong to Staten Island, Queens, Bronx, or Brooklyn
db.restaurants.find(
  { borough: { $in: ["Staten Island", "Queens", "Bronx", "Brooklyn"] } },
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);

// 19. Do NOT belong to Staten Island, Queens, Bronx, or Brooklyn
db.restaurants.find(
  { borough: { $nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"] } },
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);

// 20. Achieved a score not more than 10 (<= 10)
db.restaurants.find(
  { "grades.score": { $lte: 10 } },
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);

// 21. Prepared dish except 'American' and 'Chinees' OR name begins with 'Wil'
db.restaurants.find(
  {
    $or: [
      { cuisine: { $nin: ["American ", "Chinees"] } },
      { name: /^Wil/ }
    ]
  },
  { _id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);


//04_arrays_dates_types_and_mod
// 22. Grade "A" and score 11 on ISODate("2014-08-11T00:00:00Z") within the same grade entry
db.restaurants.find(
  {
    grades: {
      $elemMatch: {
        grade: "A",
        score: 11,
        date: ISODate("2014-08-11T00:00:00Z")
      }
    }
  },
  { _id: 0, restaurant_id: 1, name: 1, grades: 1 }
);

// 23. 2nd element of grades array (index 1) has grade "A", score 9, on ISODate("2014-08-11T00:00:00Z")
db.restaurants.find(
  {
    "grades.1.grade": "A",
    "grades.1.score": 9,
    "grades.1.date": ISODate("2014-08-11T00:00:00Z")
  },
  { _id: 0, restaurant_id: 1, name: 1, grades: 1 }
);

// 24. 2nd element of coord array (index 1) is > 42 and <= 52
db.restaurants.find(
  { "address.coord.1": { $gt: 42, $lte: 52 } },
  { _id: 0, restaurant_id: 1, name: 1, address: 1 }
);

// 25. Arrange restaurant names in ascending order along with all columns
db.restaurants.find({}).sort({ name: 1 });

// 26. Arrange restaurant names in descending order along with all columns
db.restaurants.find({}).sort({ name: -1 });

// 27. Cuisine ascending, and for the same cuisine borough descending
db.restaurants.find({}).sort({ cuisine: 1, borough: -1 });

// 28. Check whether all addresses contain the street field (documents missing street)
db.restaurants.find({ "address.street": { $exists: false } });

// 29. Select all documents where coord field value is Double (BSON type 1 or "double")
db.restaurants.find({ "address.coord": { $type: "double" } });

// 30. Remainder 0 after dividing score by 7 -> show restaurant_id, name, grades
db.restaurants.find(
  { "grades.score": { $mod: [7, 0] } },
  { _id: 0, restaurant_id: 1, name: 1, grades: 1 }
);

// 31. Contains 'mon' somewhere in name -> name, borough, longitude, latitude, cuisine
db.restaurants.find(
  { name: /mon/ },
  {
    _id: 0,
    name: 1,
    borough: 1,
    longitude: { $arrayElemAt: ["$address.coord", 0] },
    latitude: { $arrayElemAt: ["$address.coord", 1] },
    cuisine: 1
  }
);

// 32. Starts with 'Mad' in name -> name, borough, longitude, latitude, cuisine
db.restaurants.find(
  { name: /^Mad/ },
  {
    _id: 0,
    name: 1,
    borough: 1,
    longitude: { $arrayElemAt: ["$address.coord", 0] },
    latitude: { $arrayElemAt: ["$address.coord", 1] },
    cuisine: 1
  }
);