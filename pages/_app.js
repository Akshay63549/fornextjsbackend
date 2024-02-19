import "@/styles/globals.css";
// import mongoose from 'mongoose';
// // process.env.MONGOURL
// // Connect to MongoDB
// mongoose.connect("mongodb+srv://eliteAk:YjCqND9YOXpk4kdf@akshay.jylws0p.mongodb.net/projectone?retryWrites=true&w=majority", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.log(err));

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
