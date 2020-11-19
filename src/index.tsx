// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import { store } from './app/store';
// import { Provider } from 'react-redux';
// import * as serviceWorker from './serviceWorker';
// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
import {
  ConditionVariable,
  Factor,
  Queue,
  Rule,
  Rules,
  State,
  Vars
} from "./types";

interface IExpertSystem {
  _queue: Queue;
  _vars: Vars;
  _state: State;
  _rules: Rules;

  // checkVarExist(name: string): Boolean;
  // checkQueueEmpty(): Boolean;
  // checkRuleTruthy(rule: Rule): Boolean;
  // checkConditionInRule(condition: string, rule: Rule): Boolean;
  // setState(elem: ConditionVariable): void;
  // addToQueue(elem: string): void;
  // takeFromQueue(): string;
  // getResultFromRule(rule: Rule): ConditionVariable[];
  // updateInformation(rule: Rule): void;
  addEvent(event: ConditionVariable): void;
  getConclusion(): State;
}

class ExpertSystem implements IExpertSystem {
  _queue: Queue = [];
  _vars: Vars = [];
  _state: State = {};
  _rules: Rules = [];

  constructor(rules: Rule[], vars: Factor[]) {
    this._rules = rules;
    this._vars = vars;
    this._vars.forEach((elem) => {
      const { name, value } = elem;
      this._state[name] = value;
    });
  }

  private checkVarExist(name: string): Boolean {
    return this._vars.map((variable) => variable.name).includes(name);
  }

  private checkQueueEmpty = (): Boolean => this._queue.length === 0;

  private checkRuleTruthy = (rule: Rule) => {
    const { input } = rule;

    for (let condition of input) {
      if (this._state[condition.name] !== condition.value) return false;
    }

    return true;
  };

  private checkConditionInRule = (
    conditionName: string,
    rule: Rule
  ): Boolean => {
    return rule.input
      .map((condition) => condition.name)
      .includes(conditionName);
  };

  private setState(event: ConditionVariable): void {
    this._state[event.name] = event.value;
  }

  private addToQueue(conditionName: string): void {
    if (this.checkVarExist(conditionName)) {
      this._queue.push(conditionName);
    }
  }

  private takeFromQueue = (): string => {
    if (this.checkQueueEmpty()) throw Error("Queue is empty");
    const result = this._queue[0];
    this._queue.shift();
    return result;
  };

  private getResultFromRule = (rule: Rule): ConditionVariable[] => {
    return rule.output;
  };

  private updateInformation = (rule: Rule): void => {
    if (this.checkRuleTruthy(rule)) {
      const results: ConditionVariable[] = this.getResultFromRule(rule);
      results.forEach((newCondition) => {
        this.setState(newCondition);
        this.addToQueue(newCondition.name);
      });
    }
  };

  public addEvent(event: ConditionVariable): void {
    if (!this.checkVarExist(event.name)) {
      throw Error("This variable doesn't exist");
    }

    this.setState(event);
    this.addToQueue(event.name);
  }

  public getConclusion() {
    while (!this.checkQueueEmpty()) {
      const condition = this.takeFromQueue();
      const ruleWithCondition = this._rules.filter((rule) =>
        this.checkConditionInRule(condition, rule)
      );

      ruleWithCondition.forEach((rule) => {
        this.updateInformation(rule);
      });
    }

    return this._state;
  }
}

const INTEREST: Factor = {
  name: "INTEREST",
  value: null,
  possibleValues: ["INC", "DEC"],
};
const STOCK: Factor = {
  name: "STOCK",
  value: null,
  possibleValues: ["INC", "DEC"],
};
const DOLLAR: Factor = {
  name: "DOLLAR",
  value: null,
  possibleValues: ["INC", "DEC"],
};

const rules: Rules = [
  {
    input: [
      {
        name: INTEREST.name,
        value: INTEREST.possibleValues[0],
      },
    ],
    output: [
      {
        name: STOCK.name,
        value: STOCK.possibleValues[1],
      },
    ],
  },
  {
    input: [
      {
        name: INTEREST.name,
        value: INTEREST.possibleValues[1],
      },
    ],
    output: [
      {
        name: STOCK.name,
        value: STOCK.possibleValues[0],
      },
    ],
  },
];

const vars: Vars = [INTEREST, STOCK, DOLLAR];

const expertSys = new ExpertSystem(rules, vars);

expertSys.addEvent({ name: INTEREST.name, value: INTEREST.possibleValues[0] });

console.log(`${INTEREST.name} -- ${INTEREST.possibleValues[0]}`);
console.log(expertSys.getConclusion());
