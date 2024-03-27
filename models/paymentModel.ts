import mongoose, { Model, Schema, Document } from 'mongoose';

interface PaymentInterface extends Document {
	std_id: mongoose.Types.ObjectId;
	payment_method: string;
	amount: number;
	date: Date;
}

const paymentSchema = new Schema<PaymentInterface>(
	{
		std_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Student',
		},
		payment_method: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

const PaymentModel: Model<PaymentInterface> = mongoose.model<PaymentInterface>(
	'Payment',
	paymentSchema
);

export default PaymentModel;
