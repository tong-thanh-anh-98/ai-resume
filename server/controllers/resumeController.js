import { Transform } from 'stream';
import imageKit from '../configs/imageKit.js';
import Resume from '../models/Resume.js';
import fs from 'fs';

// Controller for creating a new resume
// POST /api/resumes/create
export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;

        const newResume = await Resume.create({ userId, title });

        // Return success response with the created resume
        res.status(201).json({ message: 'Resume created successfully', resume: newResume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Controller for deleting a resume
// DELETE /api/resumes/:id
export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ _id: resumeId, userId });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        await Resume.findOneAndDelete({ _id: resumeId, userId });

        // Return success response
        res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Controller for getting a resume by ID
// GET /api/resumes/:id
export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ _id: resumeId, userId });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        resume.__v = undefined; // Remove __v field from the response
        resume.createdAt = undefined; // Remove createdAt field from the response
        resume.updatedAt = undefined; // Remove updatedAt field from the response

        // Return resume data
        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Get resume by ID publicly accessible
// GET /api/resumes/public/:resumeId
export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ _id: resumeId, public: true });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Return resume data
        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Controller update resume by ID
// PUT /api/resumes/:id
export const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;

        console.log(userId);
        console.log(resumeData);

        // Check if resume exists and belongs to the user
        if (!resumeData) {
            return res.status(400).json({ message: 'resumeData is null.' });
        }

        let resumeDataCopy = JSON.parse(resumeData);

        if (image) {
            const imageBufferData = fs.createReadStream(image.path);
            const response = await imageKit.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: 'user-resumes',
                transformation: {
                    pre: 'w-300,h-300,fo-face' + (removeBackground ? 'e-background_remove' : '')
                }
            });
            resumeDataCopy.personal_info.image = response.url;
        }

        const resume = await Resume.findByIdAndUpdate({ _id: resumeId, userId }, resumeDataCopy, { new: true });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        // Return updated resume data
        return res.status(200).json({ message: 'Resume updated successfully', resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};