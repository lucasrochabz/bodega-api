export const getPaginationQuery = ({ page, pageSize }) => {
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(pageSize) || 6;

  return {
    pageNumber,
    limitNumber,
  };
};

export const buildPagination = (page = 1, limit = 6) => {
  return {
    offset: (page - 1) * limit,
    limit,
  };
};

export const getPaginationMeta = ({ totalItems, pageNumber, limitNumber }) => {
  const totalPages = Math.ceil(totalItems / limitNumber);

  return {
    page: pageNumber,
    limit: limitNumber,
    totalItems,
    totalPages,
  };
};
