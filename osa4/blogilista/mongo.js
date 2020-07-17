const mongoose = require("mongoose");

const password = process.argv[2];

const url =
  "mongodb+srv://miikamongo:mongomiika1@cluster0.1omy3.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is Easy",
  date: new Date(),
  important: true,
});

note.save().then((response) => {
  console.log("note saved!");
  mongoose.connection.close();
});
