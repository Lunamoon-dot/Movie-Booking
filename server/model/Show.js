import mongoose from "mongoose";

const showSchema = mongoose.Schema(
  {
    movie:{type:String, required:true, ref: 'Movie'},//cau hoi la tai sao co the ref Movie ma khong can import movie?
    showDateTime:{type: Date, required: true},
    showPrice:{type: Number, required: true},
    occupiedSeats:{type: Object, default:{}},

  },{minimize:false}// tac dung la nhin du lieu de hon
)

const Show =mongoose.model("Show", showSchema);

export default Show;