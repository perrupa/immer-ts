import regularProduce, {Draft} from "immer"
import deepFreezeProduce from "./deepFreezeProducer"

// Just a test... Use Immer's regular produce method, or the locally defined deepFreeze wraper
const produce = regularProduce
// const produce = process.env.NODE_ENV === 'production' ? regularProduce: deepFreezeProduce

interface ITodo {
	readonly todo: string,
	/* readonly */ done: boolean
}

interface IState {
	readonly todos: ITodo[]
}

const initialState: IState = {
	todos: [
	{
		todo: "Learn typescript",
		done: true
	},
	{
		todo: "Try immer",
		done: false
	}
	]
};

// `Draft` will strip off Typescript's readonly modifiers
const nextState = produce(initialState, (draftState: Draft<IState>) => {
	draftState.todos.push({todo: "Tweet about it", done: false})
	draftState.todos[1].done = true
})

// Inspect nextState -- 
// Note: Immer doesn't guarantee the entire object to be frozen - see: https://github.com/immerjs/immer/issues/229
// Note: Immer doesn't freeze objects in produce() - see: https://github.com/immerjs/immer/issues/260#issuecomment-443708874 for a way to do that
console.log('Frozen? nextState: ' + Object.isFrozen(nextState))
console.log('Frozen? nextState.todos: ' + Object.isFrozen(nextState.todos))
console.log('Frozen? nextState.todos[0]: ' + Object.isFrozen(nextState.todos[0]))
console.log('Frozen? nextState.todos[0].todo: ' + Object.isFrozen(nextState.todos[0].todo))
console.log('Frozen? nextState.todos[0].done: ' + Object.isFrozen(nextState.todos[0].done))

// This object *is* frozen, because it was manipulated by `draftState.todos[1].done = true` above
console.log('Frozen? nextState.todos[1]: ' + Object.isFrozen(nextState.todos[1]))
console.log('Frozen? nextState.todos[1].todo: ' + Object.isFrozen(nextState.todos[1].todo))
console.log('Frozen? nextState.todos[1].done: ' + Object.isFrozen(nextState.todos[1].done))

console.log('Frozen? nextState.todos[2]: ' + Object.isFrozen(nextState.todos[2]))
console.log('Frozen? nextState.todos[2].todo: ' + Object.isFrozen(nextState.todos[2].todo))
console.log('Frozen? nextState.todos[2].done: ' + Object.isFrozen(nextState.todos[2].done))

// The next line will error out: 
// If Typescript's `readonly` attribute is applied, a typescript error will be present.
// If Typescript's `readonly` attribute is removed from ITodo.done, a runtime error will occurr because the value is frozen
nextState.todos[1].done = false;

// The next line will error out: Value is frozen
// nextState.todos[1].todo =  "Jared";

// The next line will error out: Value is frozen -- Only if the deepFreeze version of produce is used.
// nextState.todos[2].todo =  "Jared";

// The next line will error out: Array is frozen
// nextState.todos.push({todo: 'Think about it', done: false})

console.log('nextState = ' + JSON.stringify(nextState, null, 2))

