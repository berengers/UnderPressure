module.exports = (db, Sequelize) => {
  return db.define('user', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { len: [7, 50] }
    }
  })
}
