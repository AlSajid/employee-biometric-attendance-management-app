import { models, model, Schema } from 'mongoose';

const companySchema = new Schema({
    logo: { type: String, },
    name: { type: String },
});

const Company = models.Company || model('Company', companySchema);

export default Company;
