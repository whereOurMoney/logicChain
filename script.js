// const system = {
//   state: {},
//   queue: {},
//   vars: [],
//   rules: {},

// }


class System {
  /**
   * rules = 
   */
  constructor({ rules, vars }) {
    this.rules = rules;
    this.vars = vars;
    this.state = {

    }
    this.queue = []
  }


  /*
  condition = { name: '', value: ''}
  */
  // addEvent({name, value})  {
  addEvent(condition) {
    this.setState(condition)
    // this.state[name] = value;
    this.queue.push(condition.name);

    this.handleEvent();
  }

  handleEvent() {
    const checkVarInRule = (rule, variable) => rule.input[variable] ? true : false;

    while (this.queue.length) {
      const currentVar = this.queue[0];

      this.rules.forEach((rule) => {
        const { input, output } = rule;

        if (!checkVarInRule(rule, currentVar)) return;

        const varList = Object.keys(input);
        if (varList.length === 1) {
          this.setState(output)
        } else {
          const varsFromState = this.getVarsFromState(varList);

          if (checkEnoughVars(input, varsFromState)) this.setState(output);


          this.findOuterVars(input, currentVar)
          varList.forEach(i => this.state[i])
        }
      })
    }
  }

  setState(obj) {
    this.state = {
      ...this.state,
      ...obj
    }
  }
  // addRule()
}

class System {
  /**
   * rules = 
   */
  constructor({ rules, vars }) {
    this.rules = rules;
    this.vars = vars;
    this.state = {};
    this.queue = [];
  }

  // condition = {name: '', value: ''}
  addEvent(condition) {
    this.addToQueue(condition);
    this.setState(condition);

    const rulesWithVar = this.getRulesWithVar(condition);
    // addToQueue(condition.name);
    // getRulesWithVar(condition); //number 
    // executeRulesWithOneConditionAndAddToState(); //got Conditions
    // executeRulesWithFewConditionAndAddToState(); //got Conditions
    // loopUntillVarGiveInformation();
    // deleteFromQueue();
    // repeatUntillQueueIsEmpty();
    // getResult();
  }

  addToQueue = ({ name, value }) => {
    this.queue.push(name);
  }

  setState = (condition) => {
    this.state[condition.name] = condition.value;
  }

  getRulesWithVar = ({ name, value }) => this.rules.filter(rule => {
    if (rule.input[name] && rule.input[name] === value)
      rule.input
  })


}
