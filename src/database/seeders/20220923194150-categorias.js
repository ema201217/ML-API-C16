'use strict';

const categories = [
  {
    name : 'Hogar',
    createdAt : new Date()
  },
  {
    name : 'Informática',
    createdAt : new Date()
  },
  {
    name : 'Audio y video',
    createdAt : new Date()
  },
  {
    name : 'Celulares',
    createdAt : new Date()
  },
  {
    name : 'Tiempo Libre',
    createdAt : new Date()
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('Categories', categories, {});
    
  },

  async down (queryInterface, Sequelize) {
 
     await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
