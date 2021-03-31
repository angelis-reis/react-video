import React from 'react'
import WbnPlayer from './WbnPlayer'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import GlobalStyle from '../styles/GlobalStyle'

const App = () => (
  <BrowserRouter basename="/react-videoplayer">   {/* usar o basename se o player for 
ficar em uma subpasta na  minha aplicação    */}
    <>
      <Switch>
        <Route exact path= "/" component={ WbnPlayer } />
        <Route exact path= "/:activeVideo" component={ WbnPlayer } />
      </Switch> 
      <GlobalStyle /> {/* ao chamar um componente globalStyle dentor do BrowserRouter eu aplico o stylo global em toda a aplicação  */}
    </>
  </BrowserRouter>

)

export default App;
