// $dayAdd

db.getCollection("shipping").aggregate([
  {
    $project: {
      expectedDeliveryDate: {
        $dateAdd: {
          startDate: "$purchaseDate",
          unit: "day",
          amount: 3,
        },
      },
    },
  },
  {
    $merge: "shipping",
  },
]);

// $dateDiff
db.getCollection("orders").aggregate([
  {
    $group: {
      _id: null,
      averageTime: {
        $avg: {
          $dateDiff: {
            startDate: "$purchased",
            endDate: "$delivered",
            unit: "day",
          },
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      numDays: {
        $trunc: ["$averageTime", 1],
      },
    },
  },
]);

db.getCollection("orders").aggregate([
  {
    $project: {
      _id: 0,
      day: {
        $dateDiff: {
          startDate: "$purchased",
          endDate: "$delivered",
          unit: "month",
        },
      },
    },
  },
]);

//  $dateFromParts
db.getCollection("orders").aggregate([
  {
    $project: {
      dateParts: {
        $dateFromParts: {
          year: 2017,
          month: 2,
          day: 20,
        },
      },
    },
  },
]);

// $dateFromString
db.getCollection("shipping").aggregate([
  {
    $project: {
      purchaseDate: {
        $dateFromString: {
          dateString: "$purchaseDate",
        },
      },
    },
  },
]);

// $dateSubtract

db.getCollection("orders").aggregate([
  {
    $match: {
      $expr: {
        $eq: [
          {
            $year: "$purchased",
          },
          2021,
        ],
      },
      $expr: {
        $eq: [
          {
            $month: "$purchased",
          },
          2,
        ],
      },
    },
  },
  {
    $project: {
      logoutTime: {
        $dateSubtract: {
          startDate: "$purchased",
          unit: "hour",
          amount: 3,
        },
      },
    },
  },
  {
    $merge: "orders",
  },
]);

// $dateToParts
db.getCollection("shipping").aggregate([
  {
    $project: {
      date: {
        $dateToParts: {
          date: "$purchaseDate",
        },
      },
    },
  },
]);

// $dateToString
db.getCollection("shipping").aggregate([
  {
    $project: {
      date: {
        $dateToParts: {
          date: "$purchaseDate",
        },
      },
    },
  },
]);
