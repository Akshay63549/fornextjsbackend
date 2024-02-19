const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    title: {type: String, required: false},
    slug: {type: String, required: false, unique: false},
    desc: {type: String, required: false},
    img: {type: String, required: false},
    category: {type: String, required: false},
    price: {type: String, required: false},
    availableQty: {type: String, required: false},
    size: {type: String},
    color: {type: String},
},{timestamps: true});
// module.exports = mongoose.model('Product', ProductSchema);
// mongoose.models= {}
// export default mongoose.model('Product', ProductSchema);
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);