import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Home</h1>
            <p>Some info about bugs and application generally.</p>
            <p>this algorithm is dynamical, so it process data slowly(it can take 2 hours to generate maximal diameter sphere).</p>
            <p>There is a bug with level slider that brokes UI. Just simply don`t use keys when using slider. In future versions this bag won`t be fixed, only variant is to delete navigation with keys, but to do it I need to change UI framework used for sliders.</p>
            <p>I`m thinking about version 2.0 where algorithm already loaded all spheres to database and where you will have ability to load spheres economically(inside the sphere will be deleted blocks that don`t effect outside looking). </p>
      </div>
    );
  }
}
