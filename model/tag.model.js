const Tag = require("../schema/tag.schema");

module.exports = {
  getAllTags: async () => {
    return Tag.find();
  },
  getTagByText: async (regex) => {
    return Tag.findOne({ tag_name: {$regex: regex }});
  },
  addTag: async (newTag) => {
    return Tag.create(newTag);
  },
  updateTag: async (_id, newTag) => {
    return Tag.findByIdAndUpdate(_id, newTag);
  },
};
