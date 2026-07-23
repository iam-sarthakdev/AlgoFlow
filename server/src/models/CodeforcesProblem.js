import mongoose from 'mongoose';

const { Schema } = mongoose;

const codeforcesProblemSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 300
    },
    url: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true,
        min: 800,
        max: 3500
    },
    topics: [{
        type: String,
        trim: true
    }],
    solution: {
        type: String,
        default: ''
    },
    isSolved: {
        type: Boolean,
        default: false
    },
    notes: {
        type: String,
        default: ''
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Indexes for performance
codeforcesProblemSchema.index({ user_id: 1, order: 1 });
codeforcesProblemSchema.index({ user_id: 1, difficulty: 1 });
codeforcesProblemSchema.index({ user_id: 1, topics: 1 });
codeforcesProblemSchema.index({ user_id: 1, createdAt: -1 });
codeforcesProblemSchema.index({ user_id: 1, isSolved: 1 });

const CodeforcesProblem = mongoose.model('CodeforcesProblem', codeforcesProblemSchema);

export default CodeforcesProblem;
