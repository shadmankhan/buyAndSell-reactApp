import { Provider } from 'react-redux';
import store from './store';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
// import { jssPreset, StylesProvider, MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

// const generateClassName = createGenerateClassName();
// const jss = create({
//   ...jssPreset(),
//   insertionPoint: document.getElementById('jss-insertion-point')
// });


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        {/*<StylesProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>*/}
        <CssBaseline />
        <Routes />
        {/*</MuiThemeProvider>
        </StylesProvider>*/}
      </Provider>
    </BrowserRouter>
  );
}

export default App;
