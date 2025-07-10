import { models, model, Schema } from "mongoose";

const tableShema = new Schema(
  {
    listing: { type: String, required: true },
    status: { type: String, required: true },
    history: {
      type: [
        {
          user: String,
          action: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const Table = models.Table || model("Table", tableShema);