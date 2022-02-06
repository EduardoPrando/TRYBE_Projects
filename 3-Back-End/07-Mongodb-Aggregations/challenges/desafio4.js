db.movies.aggregate([
  {
    $project: { title_split: { $split: ["$title", " "] },
      _id: false,
    },
  },
  {
    $sort: { title_split: 1 },
  },
  {
    $match: { title_split: { $size: 1 } },
  },
]);
