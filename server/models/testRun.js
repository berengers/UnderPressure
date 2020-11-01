module.exports = (db, Sequelize) => {
  return db.define('testRun', {
    uuid: { type: Sequelize.UUID, primaryKey: true },
    maxTimeToComplete: { type: Sequelize.INTEGER, allowNull: true },
    playerName: { type: Sequelize.STRING, allowNull: false },
    startedDate: { type: Sequelize.DATE, allowNull: true },
    timeToComplete: { type: Sequelize.INTEGER, allowNull: true }
  })
}
