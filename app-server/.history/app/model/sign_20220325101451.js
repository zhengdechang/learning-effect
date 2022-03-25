module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('learningEffect');

  const schema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    sign_in: { type: String },
    sign_out: { type: String },
    date: { type: String },
  });

  // 签到表
  return conn.model('Sign', schema, 'sign');
}