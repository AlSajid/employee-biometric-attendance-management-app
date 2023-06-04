import { models, model, Schema } from 'mongoose';

const leaveSchema = new Schema({
    id: { type: String },
    start: { type: Date },
    end: { type: Date },
    leaveType: { type: String }
});

const Leave = models.Leave || model('Leave', leaveSchema);

export default Leave;