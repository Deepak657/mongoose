// 1. $bucket

db.getCollection("orders").aggregate([
  {
    $bucket: {
      groupBy: "$quantity",
      boundaries: [0, 10, 20],
      default: "greater then 20",
      output: {
        count: {
          $sum: 1,
        },
        total: {
          $push: "$quantity",
        },
      },
    },
  },
]);

// 2. $densify

db.getCollection("weather").aggregate([
  {
    $densify: {
      field: "timestamp",
      range: {
        step: 1,
        unit: "hour",
        bounds: [
          ISODate("2021-05-18T00:00:00.000Z"),
          ISODate("2021-05-18T08:00:00.000Z"),
        ],
      },
    },
  },
]);

// 3. $documents
db.getCollection("records").aggregate([
  {
    $match: {
      a: {
        $in: [5, 2],
      },
    },
  },
  {
    $lookup: {
      localField: "a",
      foreignField: "d",
      as: "ab",
      pipeline: [
        {
          $documents: [
            { d: 5, name: "Palo Alto, CA" },
            { d: 2, name: "New York, NY" },
          ],
        },
      ],
    },
  },
]);

//$unionWith

db.getCollection("suppliers").aggregate([
  {
    $project: {
      state: 1,
      _id: 0,
    },
  },
  {
    $unionWith: {
      coll: "warehouses",
      pipeline: [
        {
          $project: {
            state: 1,
            _id: 0,
          },
        },
      ],
    },
  },
]);

//  $merge
db.getCollection("inventory").aggregate([
  {
    $match: {
      qty: {
        $gte: 20,
      },
    },
  },
  {
    $merge: {
      into: {
        db: "school",
        coll: "newInventory",
      },
      on: "_id",
    },
  },
]);

// $lookup

db.getCollection("student").aggregate([
  {
    $lookup: {
      from: "teacher",
      localField: "id",
      foreignField: "_id",
      as: "teacher",
    },
  },
  {
    $unwind: "$teacher",
  },
  {
    $unwind: "$favouriteSubjects",
  },
  {
    $addFields: {
      teacher: "$teacher.name",
      sub: "$teacher.subject",
    },
  },
  {
    $group: {
      _id: {
        teacher: "$teacher",
        sub: "$sub",
      },
      studentCount: {
        $sum: 1,
      },
    },
  },
]);

///// SKIP

// BucketAuto
// changeStream
// changeStreamSplitLarge
// callStats
// currentOp
// fill
// geoNear
//graphLookup
//SharededDataDistribution
//setWindowFields
