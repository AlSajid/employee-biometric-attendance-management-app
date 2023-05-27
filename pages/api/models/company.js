import { models, model, Schema } from 'mongoose';

const companySchema = new Schema({
    name: { type: String },
});T

const Company = models.Company || model('Company', companySchema);

export default Company;
