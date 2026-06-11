const prisma = require('../config/prisma');
const logger = require('../config/logger'); // Assuming a logger exists, or fallback to console

class ActivityLogService {
  /**
   * Logs an activity. Fails silently so it does not block the main operation.
   * @param {Object} params
   * @param {string} params.action - The action performed (e.g., "Created Service")
   * @param {string} params.entityType - The type of entity (e.g., "Service", "Partner")
   * @param {string|number|null} [params.entityId] - The ID of the affected entity
   * @param {string|null} [params.details] - Additional contextual details
   */
  async logActivity({ action, entityType, entityId = null, details = null }) {
    try {
      await prisma.activityLog.create({
        data: {
          action,
          entityType,
          entityId: entityId ? String(entityId) : null,
          details,
        },
      });
    } catch (error) {
      if (logger && logger.error) {
        logger.error(`Failed to log activity: ${action} on ${entityType}`, error);
      } else {
        console.error(`Failed to log activity: ${action} on ${entityType}`, error);
      }
    }
  }
}

module.exports = new ActivityLogService();
