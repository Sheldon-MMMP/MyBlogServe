'use string';


module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;
  const BlogList = app.model.define('blogList', {
    article_id: { type: INTEGER, allowNull: false, comment: '文章id', primaryKey: true, autoIncrement: true },
    article_name: { type: STRING(100), allowNull: false, comment: '文章标题' },
    category_id: { type: STRING(255), allowNull: false, comment: '技术种类', defaultValue: 'other' },
    type_id: { type: STRING(255), allowNull: true, defaultValue: 'doc' },
    md_path: { type: STRING(200), allowNull: true, default: '', comment: '文章路径' },
    created_at: DATE,
    updated_at: DATE,
  }, {
    timestamps: false, // 去除createAt updateAt
    freezeTableName: true, // 使用自定义表名
    // 实例对应的表名
    tableName: 'blogList',
    // 如果需要sequelize帮你维护createdAt,updatedAt和deletedAt必须先启用timestamps功能
    // 将createdAt对应到数据库的created_at字段
    createdAt: 'created_at',
    // 将updatedAt对应到数据库的updated_at字段
    updatedAt: 'updated_at',
    // And deletedAt to be called destroyTime (remember to enable paranoid for this to work)
    deletedAt: false, // 'deleted_at',
    // 删除数据时不删除数据，而是更新deleteAt字段 如果需要设置为true，则上面的deleteAt字段不能为false，也就是说必须启用
    paranoid: false,
  });

  return BlogList;
};
