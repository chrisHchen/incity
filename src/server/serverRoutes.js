import React from "react";
import { Route, IndexRoute } from "react-router";
import CoreLayout from '../client/layouts/CoreLayout'

import Home from '../client/routes/Home/components/HomeView'
import Counter from '../client/routes/Counter/containers/CounterContainer'

export default (
  <Route path="/" component={CoreLayout}>
  		<IndexRoute component={Home}/>
      <Route path="counter" component={Counter} />
  </Route>
);