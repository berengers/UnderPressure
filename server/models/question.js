module.exports = (db, Sequelize) =>
  db.define('question', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    asserts: { type: Sequelize.STRING, allowNull: false },
    code: { type: Sequelize.STRING, allowNull: true },
    instructions: { type: Sequelize.STRING, allowNull: true },
    name: { type: Sequelize.STRING, allowNull: false },
    order: { type: Sequelize.INTEGER, allowNull: false }
  })
