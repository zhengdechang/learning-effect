module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('learningEffect');

  const schema = new Schema({
    know_name: {
      type: String,
      unique: true,
    },
  });

  // 班级表
  return conn.model('Know', schema, 'know');
}