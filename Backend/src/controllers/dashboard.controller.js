const dashboardService = require('../services/dashboard.service');
const AppError = require('../utils/AppError');
const logger = require('../config/logger');

const getDashboardData = async (req, res, next) => {
  try {
    const data = await dashboardService.getDashboardData();

    res.status(200).json({
      success: true,
      message: "Dashboard data retrieved successfully",
      data,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

module.exports = {
  getDashboardData,
};
