import produce, {Draft} from "immer"

interface State {
	readonly x: number
}

// `x` cannot be modified here
const state: State = {
	x: 0
}

const increment = produce((draft: Draft<State>, inc: number) => {
	// `x` can be modified here
	draft.x += inc
})

const newState = increment(state, 2)
// `newState.x` cannot be modified here

