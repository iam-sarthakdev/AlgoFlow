import { ProblemList } from '../models/index.js';

export const getLists = async (req, res) => {
    try {
        const lists = await ProblemList.find().select('name description createdAt');
        res.status(200).json(lists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getListByName = async (req, res) => {
    const { name } = req.params;
    try {
        const list = await ProblemList.findOne({ name: decodeURIComponent(name) });
        if (!list) return res.status(404).json({ message: 'List not found' });
        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addProblemToList = async (req, res) => {
    const { listId, sectionTitle } = req.params;
    const { title, url, platform, difficulty } = req.body;

    try {
        const list = await ProblemList.findById(listId);
        if (!list) return res.status(404).json({ message: 'List not found' });

        const section = list.sections.find(s => s.title === sectionTitle);
        if (!section) return res.status(404).json({ message: 'Section not found' });

        section.problems.push({ title, url, platform, difficulty });
        await list.save();

        res.status(200).json(list);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
