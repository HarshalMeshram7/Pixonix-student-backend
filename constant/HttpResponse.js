const httpStatus = {
  SUCCESS: 200,
  ERROR: 500,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  CONFLICT: 409,
  CREATED: 201,
  BAD_REQUEST: 400,
  NO_CONTENT: 204,
};

const applicationStatus = {
  IN_PROGRESS: "In Progress",
  APPROVED: "Approved",
  ON_HOLD: "On Hold",
  REJECTED: "Rejected",
};

module.exports = {
  httpStatus,
  applicationStatus,
};
