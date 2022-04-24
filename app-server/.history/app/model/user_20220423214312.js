module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('learningEffect');

  const schema = new Schema({
    uname: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    name: { type: String },
    pwd: { type: String },
    user_type: { type: Number },
    created_at: { type: String },
    classes_id: { type: Schema.Types.ObjectId, ref: 'Classes' },
    mark_id: { type: Schema.Types.ObjectId, ref: 'Mark' },
    info_id: { type: Schema.Types.ObjectId, ref: 'Info' }
  });

  // 用户表
  return conn.model('User', schema, 'users');
}