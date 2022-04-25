const tagModel = require("../model/tag.model");

module.exports = {
  getAllTags: async (req, res) => {
    const tags = await tagModel.getAllTags();
    res.json(tags);
  },
  addTag: async (req, res) => {
    try {
      const newTag = req.body;
      const result = await tagModel.addTag(newTag);
      res.status(200).json(result);
    } catch(err) {
      res.status(400).json(err);
    }
  },
  updateTag: async (req, res) => {
    try {
      const {_id, ...newTag} = req.body;
      const result = await tagModel.updateTag(_id, newTag);
      res.status(200).json(result);
    } catch(err) {
      res.status(400).json(err);
    }
  }
};
