import { models, model, Schema } from "mongoose";

const companySchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
});

const Company = models.Company || model("Company", companySchema);

export default Company;
