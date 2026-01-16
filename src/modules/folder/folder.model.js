const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    parentFolder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Folder',
      default: null
    },
    color: {
      type: String,
      trim: true
    },
    icon: {
      type: String,
      trim: true
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

folderSchema.index({ owner: 1, parentFolder: 1 });

const Folder = mongoose.model('Folder', folderSchema);

module.exports = Folder;