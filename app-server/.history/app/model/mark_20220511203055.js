module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('learningEffect');

  const schema = new Schema({
    mark_name: {
      type: String,
      unique: true,
    },
    com_score: {
      type: String,
      unique: true,
    },
  });

  // 班级表
  return conn.model('Mark', schema, 'mark');
}