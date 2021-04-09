import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
import { View, Text } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import AddScreen from "./components/main/add";
import SaveScreen from "./components/main/save";
import thunk from "redux-thunk";
import MainScreen from "./components/main";
const store = createStore(rootReducer, applyMiddleware(thunk));
const firebaseConfig = {
  apiKey: "AIzaSyDeqmvBb9KUe5Img34zOR6fDdsXPpdKIHM",
  authDomain: "instagram-clone-be792.firebaseapp.com",
  projectId: "instagram-clone-be792",
  storageBucket: "instagram-clone-be792.appspot.com",
  messagingSenderId: "769133514623",
  appId: "1:769133514623:web:9716d85ad9505e65fed44a",
  measurementId: "G-FCT9XHGS67",
};
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import CommentScreeen from "./components/main/Comment";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();
export class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator intialRouteName="Landing">
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen
              name="Add"
              component={AddScreen}
              navigation={this.props.navigation}
            />
            <Stack.Screen
              name="Save"
              component={SaveScreen}
              navigation={this.props.navigation}
            />
            <Stack.Screen
              name="Comment"
              component={CommentScreeen}
              navigation={this.props.navigation}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
