const { Model } = require('objection');
const { User, Project } = require('../src/models');

exports.seed = async (knex) => {
  Model.knex(knex);
  await User.query().delete();
  await Project.query().delete();
  await knex('User_Project').delete();
  await User.query().insertGraph([
    { id: 1, username: 'Alice', password: 'alice' },
    { id: 2, username: 'Bob', password: 'bob' },
    { id: 3, username: 'John', password: 'john' },
  ]);
  await Project.query().insertGraph([
    { id: 1, title: 'Project 1', users: [{ '#dbRef': 1 }] },
    { id: 2, title: 'Project 2', users: [{ '#dbRef': 1 }, { '#dbRef': 2 }] },
    { id: 3, title: 'Project 3', users: [{ '#dbRef': 3 }] },
    { id: 4, title: 'Project 4', users: [{ '#dbRef': 4 }] },
    { id: 5, title: 'Project 5' },
  ]);
};
