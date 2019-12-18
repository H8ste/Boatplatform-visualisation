import app from "./app";

const port = process.env.PORT || "3000";
app.listen(3001, "0.0.0.0");
console.log(`Listening on port 3001`);
