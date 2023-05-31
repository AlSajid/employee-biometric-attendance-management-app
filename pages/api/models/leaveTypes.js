import { models, model, Schema } from 'mongoose';

const leaveTypeSchema = new Schema({
    type: { type: String },
    count: { type: Number },
});

const LeaveType = models.LeaveType || model('LeaveType', leaveTypeSchema);

export default LeaveType;