import React from 'react'
import { render } from 'react-dom'
import withState from 'react-state-hoc'
import { withEffects } from 'refract-most'
import { combine, periodic } from 'most'

import Layout from './Layout'

const handler = props => effect => {
    if (effect.type === 'INCREASE') {
        props.setState(({ count }) => ({ count: count + 1 }))
    }

    if (effect.type === 'DECREASE') {
        props.setState(({ count }) => ({ count: count - 1 }))
    }
}

const aperture = props => component => {
    const direction$ = component.observe('direction')

    const tick$ = periodic(1000)

    return combine(type => ({ type }), direction$, tick$)
}

const initialState = { count: 0, direction: 'NONE' }

const mapSetStateToProps = { setDirection: direction => ({ direction }) }

const App = withState(initialState, mapSetStateToProps)(
    withEffects(handler)(aperture)(Layout)
)

render(<App />, document.getElementById('root'))