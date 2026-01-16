const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['note', 'image', 'pdf', 'other'],
      required: true
    },
    content: {
      type: String,
      trim: true
    },
    fileUrl: {
      type: String,
      trim: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Folder',
      default: null
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

fileSchema.index({ owner: 1, folder: 1 });

const File = mongoose.model('File', fileSchema);

module.exports = File;