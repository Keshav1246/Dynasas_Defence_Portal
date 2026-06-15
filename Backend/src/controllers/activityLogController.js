const prisma = require("../config/db");
const AppError = require("../utils/AppError");
const logger = require("../config/logger");

const getActivityLogs = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 20);
    const skip = (page - 1) * limit;

    const { search, entityType, dateRange } = req.query;

    const where = {};

    if (entityType && entityType.toLowerCase() !== "all") {
      where.entityType = { equals: entityType, mode: "insensitive" };
    }

    if (search) {
      where.OR = [
        { action: { contains: search, mode: "insensitive" } },
        { entityType: { contains: search, mode: "insensitive" } },
      ];
      // But we need to ensure that details is checked properly.
      where.OR.push({ details: { contains: search, mode: "insensitive" } });
    }

    if (dateRange && dateRange.toLowerCase() !== "all") {
      const now = new Date();
      let startDate = new Date();
      let endDate = new Date();
      
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const todayEnd = new Date(todayStart);
      todayEnd.setDate(todayEnd.getDate() + 1);
      
      switch (dateRange.toLowerCase()) {
        case "today":
          where.createdAt = { gte: todayStart, lt: todayEnd };
          break;
        case "yesterday":
          startDate = new Date(todayStart);
          startDate.setDate(startDate.getDate() - 1);
          where.createdAt = { gte: startDate, lt: todayStart };
          break;
        case "last7days":
          startDate = new Date(todayStart);
          startDate.setDate(startDate.getDate() - 6); // Includes today + 6 previous days
          where.createdAt = { gte: startDate };
          break;
        case "last30days":
          startDate = new Date(todayStart);
          startDate.setDate(startDate.getDate() - 29); // Includes today + 29 previous days
          where.createdAt = { gte: startDate };
          break;
      }
    }

    const totalLogs = await prisma.activityLog.count({ where });

    const logs = await prisma.activityLog.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      pagination: {
        total: totalLogs,
        page,
        limit,
        totalPages: Math.ceil(totalLogs / limit),
      },
      data: logs,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

module.exports = {
  getActivityLogs,
};
