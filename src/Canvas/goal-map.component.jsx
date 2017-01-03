import React, { Component } from 'react';

import GoalCanvas from './goal-canvas.component.jsx'

class GoalMap extends Component {
    render(){
        return (
            <div>
                <h1>Goal-D</h1>
                <GoalCanvas height={600} width={800} />
            </div>
        );
    }
}

export default GoalMap
