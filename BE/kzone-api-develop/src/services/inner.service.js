const { Inner, Sequelize, sequelize } = require("../models");
const { getPagination } = require("../utils/common");
const { Op } = Sequelize;

//search by id
const searchById = async ({ id, ...payload }) => {
  const { count, rows } = await Inner.findAndCountAll({
    where: { id },
  });
  return ({
    data: { count, rows },
    message: "Searc inner successfully!",
  });
}

//search
const search = async ({ page = 0, size = 999, title }) => {
  const { limit, offset } = getPagination(page, size);
  let searchTerm = {
    limit,
    offset,
    order: [["createdAt", "ASC"]],
  };
  if (title != undefined && title != null && title != "") {
    searchTerm = {
      ...searchTerm,
      where: {
        ...searchTerm.where,
        title: {
          [Op.like]: `%${title}%`,
        },
      }
    }
  }
  const { rows, count } = await Inner.findAndCountAll(searchTerm);
  return ({
    data: { count, rows },
    message: "Search inner successfully!",
  })
}

module.exports = {
  search,
  searchById,
}