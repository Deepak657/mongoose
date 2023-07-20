// $abs

db.getCollection("ratings").aggregate([
  {
    $project: {
      delta: {
        $abs: {
          $subtract: ["$start", "$end"],
        },
      },
    },
  },
]);

// $accumulator

db.getCollection("books").aggregate([
  {
    $group: {
      _id: "$author",
      avgCopies: {
        $avg: "$copies",
      },
    },
  },
]);
db.getCollection("books").aggregate([
  {
    $group: {
      _id: null,
      sumOfCopies: {
        $sum: "$copies",
      },
    },
  },
]);

// $add

db.getCollection("orders").aggregate([
  {
    $project: {
      name: 1,
      total: {
        $add: ["$price", "$quantity"],
      },
    },
  },
]);

// $addToSet

db.getCollection("orders").aggregate([
  {
    $group: {
      _id: {
        year: {
          $year: "$date",
        },
      },
      total: {
        $addToSet: "$name",
      },
    },
  },
]);

// $allElementTrue

db.survey.aggregate([
  {
    $project: {
      responses: 1,
      isAllTrue: { $allElementsTrue: ["$responses"] },
      _id: 0,
    },
  },
])[
  ({ responses: [true], isAllTrue: true },
  { responses: [true, false], isAllTrue: false },
  { responses: [], isAllTrue: true },
  { responses: [1, true, "seven"], isAllTrue: true },
  { responses: [0], isAllTrue: false },
  { responses: [[]], isAllTrue: true },
  { responses: [[0]], isAllTrue: true },
  { responses: [[false]], isAllTrue: true },
  { responses: [null], isAllTrue: false },
  { responses: [undefined], isAllTrue: false })
];

// $arrayElemAt
db.getCollection("inventory").aggregate([
  {
    $project: {
      item: 1,
      first: {
        $arrayElemAt: ["$tags", 0],
      },
      last: {
        $arrayElemAt: ["$tags", -1],
      },
    },
  },
]);

// $arrayToObject

db.getCollection("inventory").aggregate([
  {
    $project: {
      item: 1,
      dimensions: { $arrayToObject: "$dimensions" },
    },
  },
]);

// $acos

// {
//   "_id" : ObjectId("5c50782193f833234ba90d85"),
//   "side_a" : NumberDecimal("3"),
//   "side_b" : NumberDecimal("4"),
//   "hypotenuse" : NumberDecimal("5")
// }

db.trigonometry.aggregate([
  {
    $addFields: {
      angle_a: {
        $radiansToDegrees: {
          $acos: {
            $divide: ["$side_b", "$hypotenuse"],
          },
        },
      },
    },
  },
]);

// {
//   "_id" : ObjectId("5c50782193f833234ba90d85"),
//   "side_a" : NumberDecimal("3"),
//   "side_b" : NumberDecimal("4"),
//   "hypotenuse" : NumberDecimal("5"),
//   "angle_a" : NumberDecimal("36.86989764584402129685561255909341")
// }

// $acosh

db.trigonometry.aggregate([
  {
    $addFields: {
      "y-coordinate": {
        $radiansToDegrees: { $acosh: "$x-coordinate" },
      },
    },
  },
]);

// {
//   "_id" : ObjectId("5c50782193f833234ba90d85"),
//   "x-coordinate" : NumberDecimal("3"),
//   "y-coordinate" : NumberDecimal("100.9979734210524228844295260083432")
// }

//  same as
//  $sin ,$sinh
