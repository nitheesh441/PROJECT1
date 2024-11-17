const Feedback = require("../models/feedback.model")

const testfeedback = (req, res) => {
    return res.send("Hello From Feedbacks!");
};

const FeedbacksGetController = async (req, res) => {
   
  

    try {
      const feedback = await Feedback.find({ feedbackType: { $ne: 'Portal' } });
      res.status(200).json(feedback);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };
    const FeedbacksPostController = async (req, res) => {
      try {
        const { username, userType, feedbackType, message } = req.body;
    
        // Check for missing required fields
        if (!username || !userType || !feedbackType || !message) {
         
          return res.status(400).json({ success: false, message: 'All fields are required.' });
        }
    
        const newFeedback = new Feedback({
          username,
          userType,
          feedbackType,
          message,
          date: new Date(),
        });
    
        await newFeedback.save(); // Ensure you await the save operation
    
        return res.status(201).json({ success: true, message: 'Feedback submitted successfully.' });
      } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while submitting feedback.', error: error.message });
      }
    };
    
    
module.exports = {
    testfeedback,FeedbacksGetController,FeedbacksPostController
    
};