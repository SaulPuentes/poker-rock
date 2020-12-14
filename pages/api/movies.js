import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();
  const cursor = await db.collection('movies').watch().on('change', data => console.log(new Date(), data));
  // console.log('cursor: ', cursor);
  const insert = await db.collection('movies').insertOne({test:'test'});

  res.json(movies);
};