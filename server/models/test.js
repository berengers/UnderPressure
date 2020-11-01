module.exports = (db, Sequelize) => {
  return db.define('test', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: Sequelize.STRING, allowNull: false }
  })
}
