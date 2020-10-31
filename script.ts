// type Input = {
//   [name: string]: string;
// }
// type Output  = {
//   [name: string]: string;
// }

interface Rule {
  input: Object;
  output: Object;
}
type Rules = Rule[];

type IState = ICondition[];

interface ICondition {
  name: string;
  value: string | number;
}

interface IExpertSystem {
  addEvent(condition: ICondition): void;
  addToQueue(condition: ICondition): void;
  addToState(condition: ICondition): void;
  getRulesWithVar(condition: ICondition): Rules;
  exucuteResults(): IState;
}

class ExpertSystem implements IExpertSystem {
  rules: Rules;
  vars: Object;
  state: IState;
  queue: string[];

  constructor(rules: Rules, vars: Object) {
    this.rules = rules;
    this.vars = vars;
    this.state = [];
    this.queue = [];
  }

  addEvent = (condition: ICondition) => {
    this.addToQueue(condition);
    this.addToState(condition);

    this.getResults();

    // while (this.isQueueFull())
    // const RulesWithVar: Rules = this.getRulesWithVar(condition);
  };

  getResults = () => {
    while (this.queue.length > 0) {
      const currentCondition = this.state.filter(
        (condition) => condition.name === this.queue[0]
      )[0];

      const rulesWithCondition = this.getRulesWithCondition(currentCondition);
    }
  };

  addToQueue = (condition: ICondition) => {
    this.queue.push(condition.name);
  };

  addToState = (condition: ICondition) => {
    this.state[condition.name] = condition.value; //arr
  };

  getRulesWithCondition = (condition: ICondition) =>
    this.rules.filter((rule) => {
      const { name: varName, value } = condition;
      const { input, output } = rule;
      if (input[varName] && input[varName] === value) return true;
      return false;
    });
}
