const Tag = require("../schema/tag.schema");

module.exports = {
    getAllTags: async () => {
        return Tag.find();
    },
    addTag: async (newTag) => {
        return Tag.create(newTag);
    },
    updateTag: async (_id, newTag) => {
        return Tag.findByIdAndUpdate(_id, newTag)
    }
}
