import mongoose, { ObjectId, Schema } from 'mongoose'

export type IReview = {
  user: ObjectId,
  movie: ObjectId,
  text: string,
  rating: number,
  watchedAt: Date
}

const schema = new Schema<IReview>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  movie: {
    type: String,
    ref: 'movie'
  },
  text: {
    type: String
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  watchedAt: {
    type: Date
  }
})

export const ReviewModel = mongoose.model<IReview>('review', schema)
