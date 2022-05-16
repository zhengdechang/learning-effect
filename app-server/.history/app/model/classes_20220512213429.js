module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('learningEffect');

  const schema = new Schema({
    classes_name: {
      type: String,
      unique: true,
    },
    com_pc: {
      type: String,
    },
  });

  // 班级表
  return conn.model('Classes', schema, 'classes');
}