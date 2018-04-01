import mongoose from 'mongoose'

const AutoReplyScheme = new mongoose.Schema({
    chatId: String,
    userId: String,
    triggerPhrase: String,
    responsePhrase: String,
    dateCreate: {
        type: Date,
        default: Date.now,
    }
})

AutoReplyScheme.index({
    chatId: 1,
})

AutoReplyScheme.static.getSchema = () => AutoReplyScheme

export default mongoose.model('AutoReply', AutoReplyScheme)