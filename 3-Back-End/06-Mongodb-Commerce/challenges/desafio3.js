db.produtos.updateMany({}, {
  $set: { avaliacao: NumberInt("0") },
});

db.produtos.updateMany(
  { tags: "bovino" },
  { $set: { avaliacao: 5 } },
);

db.produtos.updateMany(
  { tags: "ave" },
  { $set: { avaliacao: 3 } },
);

db.produtos.find({}, {
  _id: false,
  nome: true,
  avaliacao: true,
});