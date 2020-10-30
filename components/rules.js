let rules = {
  rule10: {
    interest: true,
    stock: false,
  },
  rule20: {
    interest: false,
    stock: true,
  },
  rule30: {
    dollar: false,
    interest: true,
  },
  rule40: {
    dollar: true,
    interest: false,
  },
  rule50: {
    fedint: false,
    fedmon: true,
    interest: false,
  },
}

export default rules;