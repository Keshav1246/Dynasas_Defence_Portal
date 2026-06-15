const prisma = require("../config/db");
const logger = require("../config/logger");
const activityLogService = require("../services/ActivityLogService");

const getSettings = async (req, res, next) => {
  try {
    const settings = await prisma.settings.findFirst();

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const createSettings = async (req, res, next) => {
  try {
    const existing = await prisma.settings.findFirst();

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Settings already exist",
      });
    }

    const settings = await prisma.settings.create({
      data: req.body,
    });

    res.status(201).json({
      success: true,
      message: "Settings Created",
      data: settings,
    });

    activityLogService.logActivity({
      action: `Created settings`,
      entityType: "Settings",
      entityId: settings.id,
    });
  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

const updateSettings = async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const settings = await prisma.settings.update({
      where: { id },
      data: body,
    });

    res.status(200).json({
      success: true,
      message: "Settings Updated",
      data: settings,
    });

    const actions = [];
    if (body.primaryColor !== undefined || body.accentColor !== undefined || body.backgroundDark !== undefined || body.textColor !== undefined || body.primaryLogo !== undefined || body.darkLogo !== undefined || body.favicon !== undefined || body.headingFont !== undefined || body.bodyFont !== undefined) {
      actions.push('Updated branding settings');
    }
    if (body.linkedinUrl !== undefined || body.twitterUrl !== undefined || body.youtubeUrl !== undefined || body.facebookUrl !== undefined || body.instagramUrl !== undefined) {
      actions.push('Updated social media settings');
    }
    if (body.portalName !== undefined || body.siteName !== undefined || body.siteDescription !== undefined || body.supportEmail !== undefined || body.supportPhone !== undefined || body.defaultLanguage !== undefined || body.timezone !== undefined || body.maintenanceMode !== undefined) {
      actions.push('Updated site settings');
    }

    if (actions.length === 0) actions.push('Updated settings');

    for (const action of actions) {
      activityLogService.logActivity({
        action,
        entityType: "Settings",
        entityId: settings.id,
      });
    }

  } catch (error) {
    logger.error(error.message);
    next(error);
  }
};

module.exports = {
  getSettings,
  createSettings,
  updateSettings,
};
