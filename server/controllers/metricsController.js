const User = require("../models/User");
const Client = require("../models/Client");

const getDummyData = () => ({
  success: 5,
  errors: 2,
  dates: ["2024-09-01"],
  successCounts: [5],
  errorCounts: [2],
  weeks: ["Week of 2024-09-01"],
  weekSuccessCounts: [5],
  weekErrorCounts: [2],
  months: ["Month of 2024-09-01"],
  monthSuccessCounts: [5],
  monthErrorCounts: [2],
});

exports.getDailyMetrics = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const userSuccessfulOperations = await User.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });
    const userErrorOperations = await User.countDocuments({
      error: { $exists: true, $gte: startOfDay, $lte: endOfDay },
    });

    const clientSuccessfulOperations = await Client.countDocuments({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });
    const clientErrorOperations = await Client.countDocuments({
      error: { $exists: true, $gte: startOfDay, $lte: endOfDay },
    });

    const totalSuccessfulOperations =
      userSuccessfulOperations + clientSuccessfulOperations;
    const totalErrorOperations = userErrorOperations + clientErrorOperations;

    if (totalSuccessfulOperations === 0 && totalErrorOperations === 0) {
      return res.json(getDummyData());
    }

    res.json({
      success: totalSuccessfulOperations,
      errors: totalErrorOperations,
      dates: [startOfDay.toISOString().split("T")[0]],
      successCounts: [totalSuccessfulOperations],
      errorCounts: [totalErrorOperations],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getWeeklyMetrics = async (req, res) => {
  try {
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    const endOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 6)
    );

    const userSuccessfulOperations = await User.countDocuments({
      createdAt: { $gte: startOfWeek, $lte: endOfWeek },
    });
    const userErrorOperations = await User.countDocuments({
      error: { $exists: true, $gte: startOfWeek, $lte: endOfWeek },
    });

    const clientSuccessfulOperations = await Client.countDocuments({
      createdAt: { $gte: startOfWeek, $lte: endOfWeek },
    });
    const clientErrorOperations = await Client.countDocuments({
      error: { $exists: true, $gte: startOfWeek, $lte: endOfWeek },
    });

    const totalSuccessfulOperations =
      userSuccessfulOperations + clientSuccessfulOperations;
    const totalErrorOperations = userErrorOperations + clientErrorOperations;

    if (totalSuccessfulOperations === 0 && totalErrorOperations === 0) {
      return res.json(getDummyData());
    }

    res.json({
      success: totalSuccessfulOperations,
      errors: totalErrorOperations,
      weeks: [`Week of ${startOfWeek.toISOString().split("T")[0]}`],
      successCounts: [totalSuccessfulOperations],
      errorCounts: [totalErrorOperations],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMonthlyMetrics = async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const userSuccessfulOperations = await User.countDocuments({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });
    const userErrorOperations = await User.countDocuments({
      error: { $exists: true, $gte: startOfMonth, $lte: endOfMonth },
    });

    const clientSuccessfulOperations = await Client.countDocuments({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    });
    const clientErrorOperations = await Client.countDocuments({
      error: { $exists: true, $gte: startOfMonth, $lte: endOfMonth },
    });

    const totalSuccessfulOperations =
      userSuccessfulOperations + clientSuccessfulOperations;
    const totalErrorOperations = userErrorOperations + clientErrorOperations;

    if (totalSuccessfulOperations === 0 && totalErrorOperations === 0) {
      return res.json(getDummyData());
    }

    res.json({
      success: totalSuccessfulOperations,
      errors: totalErrorOperations,
      months: [`Month of ${startOfMonth.toISOString().split("T")[0]}`],
      successCounts: [totalSuccessfulOperations],
      errorCounts: [totalErrorOperations],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
