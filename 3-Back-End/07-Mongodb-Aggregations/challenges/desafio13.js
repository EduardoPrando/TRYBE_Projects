db.trips.aggregate([
  { $match: {
    startTime: {
      $gte: new Date("2016-03-10"),
      $lt: new Date("2016-3-11"),
    },
  } },
  { $group: {
    _id: null,
    toMinutes: { $avg: { $dateDiff: {
      startDate: "$startTime",
      endDate: "$stopTime",
      unit: "minute",
    } } },
  } },
  { $project: {
    _id: false,
    duracaoMediaEmMinutos: { $ceil: "$toMinutes" },
  } },
]);
