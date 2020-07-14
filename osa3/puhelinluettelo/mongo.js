const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://miikamongo:${password}@cluster0.1omy3.mongodb.net/person?retryWrites=true`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", noteSchema);

if (process.argv.length < 4) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });

    process.exit(1);
  });
}
if (process.argv.length > 4) {
  const nimi = process.argv[3];
  const numero = process.argv[4];
  const person = new Person({
    name: nimi,
    number: numero,
  });
  person.save().then((response) => {
    console.log(`added ${nimi} number ${numero} to phonebook`);
    mongoose.connection.close();
  });
}
