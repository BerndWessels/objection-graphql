const BaseModel = require('./BaseModel');

module.exports = class Project extends BaseModel {
  static get jsonSchema() {
    return {
      type: 'object',

      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }

  static async modifyApiQuery(qb, { userId }) {
    const knex = Project.knex();
    qb.whereIn(
      'id',
      knex('User_Project')
        .select('project_id')
        .where({ user_id: userId }),
    );
  }

  static get relationMappings() {
    return {
      users: {
        relation: this.ManyToManyRelation,
        modelClass: 'User',
        join: {
          from: 'Project.id',
          through: {
            from: 'User_Project.project_id',
            to: 'User_Project.user_id',
          },
          to: 'User.id',
        },
      },
    };
  }
};
