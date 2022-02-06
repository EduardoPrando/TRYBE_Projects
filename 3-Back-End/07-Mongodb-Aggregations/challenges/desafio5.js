db.movies.aggregate([
  { $match: {
    countries: "USA",
    "tomatoes.viewer.rating": { $gte: 3 },
    cast: { $exists: true },
  } },
  { $addFields: {
    favoriteCast: {
      $setIntersection: [
        [
          "Sandra Bullock",
          "Tom Hanks",
          "Julia Roberts",
          "Kevin Spacey",
          "George Clooney",
        ],
        "$cast",
      ],
    },
  } },
  { $addFields: {
    num_favs: { $size: "$favoriteCast" },
  } },
  { $sort: {
    num_favs: -1,
    "tomatoes.viewer.rating": -1,
    title: -1,
  } },
  { $skip: 24 },
  { $limit: 1 },
  { $project: {
    _id: false,
    title: true,
  } },
]);
