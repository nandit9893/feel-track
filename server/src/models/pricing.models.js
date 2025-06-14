import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    monthlyPrice: {
      type: Number,
      required: true,
      unique: true,
    },
    yearlyPrice: {
      type: Number,
      required: true,
      unique: true,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    descriptionPoints: [
      {
        description: {
          type: String,
          required: true,
          unique: true,
        },
        imageURL: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

pricingSchema.pre("save", function (next) {
  const fullPrice = this.monthlyPrice * 12;
  this.discountPrice = fullPrice - this.yearlyPrice;
  this.discountPercentage = Math.round((this.discountPrice / fullPrice) * 100);
  next();
});

const Pricing = mongoose.model("Pricing", pricingSchema);

export default Pricing;
