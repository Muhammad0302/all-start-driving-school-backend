import mongoose, { Model, Schema } from 'mongoose';

interface packageInterface extends Document {
    id: mongoose.Types.ObjectId;
    save(): unknown;
    name: string;
    price: number;
    no_of_lesson: number;
    // Add more fields as needed
}
const packageSchema = new Schema<packageInterface>(
    {
        id: {
        	type: mongoose.Schema.Types.ObjectId,
        	ref: 'id',
            required: true
        },

        name: [
            {
                type: String,
                required: true,
            },
        ],
        price: {
            type: Number,
            required: true,
        },
        no_of_lesson: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }

);
const packageModel: Model<packageInterface> = mongoose.model<packageInterface>(
    'Package',
    packageSchema
);
export{packageInterface};
export default packageModel;

