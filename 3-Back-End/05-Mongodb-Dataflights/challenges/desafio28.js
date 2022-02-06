const companyName = "LATAM AIRLINES BRASIL";
db.resumoVoos.insertOne(
  {
    empresa: companyName,
    totalVoosDomesticos: db.voos.find(
      {
        "empresa.nome": companyName,
        natureza: "Doméstica",
      },
    ).count(),
  },
);

db.resumoVoos.findOne(
  {
    empresa: companyName,
  },
  {
    _id: false,
    empresa: true,
    totalVoosDomesticos: true,
  },
);