const Settings = require("../models/Settings");

// GET Settings
exports.getSettings = async (req, res) => {
    try {

        let settings = await Settings.findOne();

        if (!settings) {
            settings = await Settings.create({
                storeName: "StorePilot",
                currency: "INR",
                logo: ""
            });
        }

        res.json({
            success: true,
            settings
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE Settings
exports.updateSettings = async (req, res) => {
    try {

        let settings = await Settings.findOne();

        if (!settings) {
            settings = await Settings.create(req.body);
        } else {
            settings = await Settings.findByIdAndUpdate(
                settings._id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );
        }

        res.json({
            success: true,
            message: "Settings updated successfully",
            settings
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};