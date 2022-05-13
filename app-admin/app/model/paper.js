module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('learningEffect');

  const schema = new Schema({
    paper_title: { type: String },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    paper_type: { type: Number },
    created_at: { type: String },
    paper_points: { type: String },
    pass_at: { type: String },
    paper_status: { type: Number, default: 0 },
    paper_time: { type: Number },
    paper_for_classes: [Schema.Types.ObjectId],
    paper_score: { type: Number },
  });

  // 试卷表
  return conn.model('Paper', schema, 'papers');
}