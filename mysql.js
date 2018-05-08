const Sequelize = require('sequelize');
const config = require('./database.config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
});

const Images = sequelize.define('images', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  url: Sequelize.STRING(500),
  created_at: Sequelize.BIGINT,
}, {
    timestamps: false
  });

module.exports = {
  Images
};

// let now = Date.now();

// (async () => {
//   var image = await Images.create({
//     id: 'd-' + now,
//     url: '111',
//     created_at: now
//   });
//   console.log('created: ' + JSON.stringify(image));
// })();