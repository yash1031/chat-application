import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId, 
            require: true, 
            re: "User",
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true, 
            re: "User",
        },
        text: {
            type: String, 
        },
        image:{
            type: String,
        }
    },
    {timestamps: true}
)

const Message= mongoose.model("Message", messageSchema);
export default Message;