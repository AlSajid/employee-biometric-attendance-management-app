import { models, model, Schema } from 'mongoose';

const leaveSchema = new Schema({
    id: { type: String },
    date: { type: Date },
    leaveType: { type: String }
});

const Leave = models.Leave || model('Leave', leaveSchema);

export default Leave;