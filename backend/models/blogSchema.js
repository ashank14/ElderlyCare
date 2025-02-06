import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Refers to the User who created the blog
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  imageUrl: { type: String } // Optional image URL for the blog (featured image)
});

const blogModel = mongoose.model('Blog', blogSchema);

export default blogModel;
