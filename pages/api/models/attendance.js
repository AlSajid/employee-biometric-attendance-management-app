import { models, model, Schema } from 'mongoose';

const attendanceSchema = new Schema(
    {
        userSn: { type: String, required: true },
        deviceUserId: { type: String, required: true },
        recordTime: { type: Date, required: true },
        ip: { type: String, required: true },

    }
);

const Attendance = models.Attendance || model('Attendance', attendanceSchema);

export default Attendance;