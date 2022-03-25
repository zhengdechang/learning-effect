module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('learningEffect');

  const schema = new Schema({
    paper_id: { type: Schema.Types.ObjectId, ref: 'Paper' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    start_time: { type: String },
    end_time: { type: String },
    score: { type: Number },
  });

  // 考试记录表
  return conn.model('Exam', schema, 'exams');
}