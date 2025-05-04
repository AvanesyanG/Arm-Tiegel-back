import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { ROLES } from '../config/constants.js';

const { Schema } = mongoose;

const employeeSchema = new Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.EMPLOYEE },
    hashed_password: { type: String, required: true }
});
employeeSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.hashed_password);
};
employeeSchema.pre('save', async function(next) {
    if (this.isModified('hashed_password')) {
        this.hashed_password = await bcrypt.hash(this.hashed_password, 10);
    }
    next();
});

export default mongoose.model('Employee', employeeSchema);