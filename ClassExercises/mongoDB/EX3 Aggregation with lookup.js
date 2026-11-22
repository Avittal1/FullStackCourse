// Collections: customers, purchases, stores

// 1. Selection: Show first_name, last_name, and country of all customers, hiding _id
db.customers.aggregate([
  {
    $project: {
      _id: 0,
      first_name: 1,
      last_name: 1,
      country: 1
    }
  }
]);

// 2. Basic Filtering: Find all customers from "Israel" who are older than 40
db.customers.aggregate([
  {
    $match: {
      country: "Israel",
      age: { $gt: 40 }
    }
  }
]);

// 3. Count & Match: Calculate how many purchases have a "shipped" status
db.purchases.aggregate([
  { $match: { status: "shipped" } },
  { $count: "shipped_purchases_count" }
]);

// 4. Join (Lookup): Join purchases with customers to show item name and buyer's first_name
db.purchases.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "_id",
      as: "customer_info"
    }
  },
  { $unwind: "$customer_info" },
  {
    $project: {
      _id: 0,
      item: 1,
      first_name: "$customer_info.first_name"
    }
  }
]);

// 5. Filtered Join: Find all purchases made by "Gold" members (item, amount, membership)
db.purchases.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "_id",
      as: "customer_info"
    }
  },
  { $unwind: "$customer_info" },
  {
    $match: {
      "customer_info.membership": "Gold"
    }
  },
  {
    $project: {
      _id: 0,
      item: 1,
      amount: 1,
      membership: "$customer_info.membership"
    }
  }
]);

// 6. Store Join: Join purchases with stores to show item name and store_name
db.purchases.aggregate([
  {
    $lookup: {
      from: "stores",
      localField: "store_id",
      foreignField: "_id",
      as: "store_info"
    }
  },
  { $unwind: "$store_info" },
  {
    $project: {
      _id: 0,
      item: 1,
      store_name: "$store_info.store_name"
    }
  }
]);

// 7. Triple Join: Join purchases with customers and stores (first_name, item, store city)
db.purchases.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "_id",
      as: "customer_info"
    }
  },
  { $unwind: "$customer_info" },
  {
    $lookup: {
      from: "stores",
      localField: "store_id",
      foreignField: "_id",
      as: "store_info"
    }
  },
  { $unwind: "$store_info" },
  {
    $project: {
      _id: 0,
      first_name: "$customer_info.first_name",
      item: 1,
      city: "$store_info.city"
    }
  }
]);

// 8. Grouping: Calculate the total amount of money spent per country
db.purchases.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "_id",
      as: "customer_info"
    }
  },
  { $unwind: "$customer_info" },
  {
    $group: {
      _id: "$customer_info.country",
      total_spent: { $sum: "$amount" }
    }
  },
  {
    $project: {
      _id: 0,
      country: "$_id",
      total_spent: 1
    }
  }
]);

// 9. Sorting & Limits: Top 3 most expensive purchases (item, amount, store manager name)
db.purchases.aggregate([
  { $sort: { amount: -1 } },
  { $limit: 3 },
  {
    $lookup: {
      from: "stores",
      localField: "store_id",
      foreignField: "_id",
      as: "store_info"
    }
  },
  { $unwind: "$store_info" },
  {
    $project: {
      _id: 0,
      item: 1,
      amount: 1,
      manager: "$store_info.manager"
    }
  }
]);

// 10. Average Calculation: Average purchase amount for each membership type
db.purchases.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "_id",
      as: "customer_info"
    }
  },
  { $unwind: "$customer_info" },
  {
    $group: {
      _id: "$customer_info.membership",
      avg_amount: { $avg: "$amount" }
    }
  },
  {
    $project: {
      _id: 0,
      membership: "$_id",
      avg_amount: 1
    }
  }
]);

// 11. Multi-condition Join: Purchases of "Tech" items in stores located in "London"
db.purchases.aggregate([
  { $match: { category: "Tech" } },
  {
    $lookup: {
      from: "stores",
      localField: "store_id",
      foreignField: "_id",
      as: "store_info"
    }
  },
  { $unwind: "$store_info" },
  {
    $match: {
      "store_info.city": "London"
    }
  }
]);

// 12. Aggregated Match: Countries with a total purchase amount exceeding 5,000
db.purchases.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "_id",
      as: "customer_info"
    }
  },
  { $unwind: "$customer_info" },
  {
    $group: {
      _id: "$customer_info.country",
      total_spent: { $sum: "$amount" }
    }
  },
  {
    $match: {
      total_spent: { $gt: 5000 }
    }
  },
  {
    $project: {
      _id: 0,
      country: "$_id",
      total_spent: 1
    }
  }
]);

// 13. Data Transformation: Show store_name in uppercase and manager name for all stores
db.stores.aggregate([
  {
    $project: {
      _id: 0,
      store_name: { $toUpper: "$store_name" },
      manager: 1
    }
  }
]);

// 14. Customer Behavior: Count unique items bought by customers from "Canada"
db.purchases.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customer_id",
      foreignField: "_id",
      as: "customer_info"
    }
  },
  { $unwind: "$customer_info" },
  {
    $match: {
      "customer_info.country": "Canada"
    }
  },
  {
    $group: {
      _id: null,
      unique_items: { $addToSet: "$item" }
    }
  },
  {
    $project: {
      _id: 0,
      unique_items_count: { $size: "$unique_items" }
    }
  }
]);

// 15. Complex Summary: For each store city, total revenue and max single purchase amount
db.purchases.aggregate([
  {
    $lookup: {
      from: "stores",
      localField: "store_id",
      foreignField: "_id",
      as: "store_info"
    }
  },
  { $unwind: "$store_info" },
  {
    $group: {
      _id: "$store_info.city",
      total_revenue: { $sum: "$amount" },
      max_single_purchase: { $max: "$amount" }
    }
  },
  {
    $project: {
      _id: 0,
      city: "$_id",
      total_revenue: 1,
      max_single_purchase: 1
    }
  }
]);