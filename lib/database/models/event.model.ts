import { Document, Schema, model, models } from "mongoose";
import { isFloat32Array } from "util/types";

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price?: string;
  isFree: boolean;
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
}

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  locaiton: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  imageUrl: { type: String, required: true },
  startDateTime: {
    type: Date,
    default: Date.now(),
  },
  endDateTime: {
    type: Date,
    default: Date.now(),
  },
  price: String,
  isFree: {
    type: Boolean,
    default: false,
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Event = models.Evnet || model("Event", EventSchema);

export default Event;
