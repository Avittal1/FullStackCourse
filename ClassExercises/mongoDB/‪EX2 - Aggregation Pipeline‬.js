//1. Show each restaurant’s name and borough, hide _id
db.restaurants.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      borough: 1
    }
  }
])

//2. calculates the number of restaurants in Manhattan
db.restaurants.aggregate([
  { $match: { borough: "Manhattan" } },
  { $group: { _id: "$borough", totalRestaurants: { $sum: 1 } } }
])

//3. Count restaurants per borough
db.restaurants.aggregate([
  {
    $group: {
      _id: "$borough",
      restaurantCount: { $sum: 1 }
    }
  },
  { $sort: { restaurantCount: -1 } }
])

//4. Top 5 cuisine in Brooklyn
db.restaurants.aggregate([
  { $match: { borough: "Brooklyn" } },
  { $group: { _id: "$cuisine", amount: { $sum: 1 } } },
  { $sort: { amount: -1 } },
  { $limit: 5 },
  { $project: { _id: 0, cuisine: "$_id", amount: 1 } }
])

//5. calculates the average score of each restaurant. Project borough name, restaurant name, average score.
db.restaurants.aggregate([
  { $unwind: "$grades" },
  {
    $group: {
      _id: "$_id",
      borough: { $first: "$borough" },
      name: { $first: "$name" },
      averageScore: { $avg: "$grades.score" }
    }
  },
  {
    $project: {
      _id: 0,
      borough: 1,
      name: 1,
      averageScore: 1
    }
  }
])

//6. List restaurants that at least once got grade “B”.
db.restaurants.aggregate([
  { $match: { "grades.grade": "B" } },
  { $project: { _id: 0, name: 1, borough: 1, grades: 1 } }
])

//7. For each restaurant, compute min and max historical score.
db.restaurants.aggregate([
  { $unwind: "$grades" },
  {
    $group: {
      _id: "$_id",
      name: { $first: "$name" },
      borough: { $first: "$borough" },
      minScore: { $min: "$grades.score" },
      maxScore: { $max: "$grades.score" }
    }
  },
  {
    $project: {
      _id: 0,
      name: 1,
      borough: 1,
      minScore: 1,
      maxScore: 1
    }
  }
])