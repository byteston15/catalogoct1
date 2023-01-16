const infoError = {
  NotNullValidation: {
    code: 101,
    description: "Los campos requeridos no pueden estar vacios",
  },
  GeneralError: {
    code: 099,
    description: "Error no identificado, reiniciando app",
  },
  FkDoesntExist : {
    code : 102,
    description : "La fk indicada no existe."
  },
  UniqueConstraint : {
    description : 'La pk ya existe en la base de datos'
  }
};

module.exports = infoError;
