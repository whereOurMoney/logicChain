// let rules = {
//   rule10: {
//     interest: true,
//     stock: false,
//   },
//   rule20: {
//     interest: false,
//     stock: true,
//   },
//   rule30: {
//     dollar: false,
//     interest: true,
//   },
//   rule40: {
//     dollar: true,
//     interest: false,
//   },
//   rule50: {
//     fedint: false,
//     fedmon: true,
//     interest: false,
//   },
// }

let rules = [
  {
    input: {
      interest: 'grow'
    },
    output: {
      stock: 'fall'
    }
  },
  {
    input: {
      interest: 'fall'
    },
    output: {
      stock: 'grow'
    }
  },
  {
    input: {
      dollar: 'fall'
    },
    output: {
      interest: 'grow'
    }
  },
  {
    input: {
      dollar: 'grow'
    },
    output: {
      interest: 'fall'
    }
  },
  {
    input: {
      fedint: 'fall',
      fedmon: 'add',
    },
    output: {
      interest: 'fall'
    }
  },
]

export default rules;