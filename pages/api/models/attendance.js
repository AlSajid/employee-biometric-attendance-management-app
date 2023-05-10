import { models, model, Schema } from 'mongoose';

const attendanceSchema = new Schema({
    logo: { type: String, },
    name: { type: String },
});

const Attendance = models.Attendance || model('Attendance', attendanceSchema);

export default Attendance;
