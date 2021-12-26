import {navigationRef} from "./src/RootNavigation";
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AccountScreen from "./src/screens/AccountScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Context as AuthContext, Provider as AuthProvider} from "./src/context/AuthContext";
import {Provider as LocationProvider} from "./src/context/locationContext";
import {Provider as TrackProvider} from "./src/context/TrackContext";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {FontAwesome} from '@expo/vector-icons';


const MainFlow = createBottomTabNavigator();

const LoginFlow = createStackNavigator();
const TrackCreateStack = createStackNavigator();
const AccountStack = createStackNavigator();
const TrackListStack = createStackNavigator();


const Account = () => (
    <AccountStack.Navigator>
        <AccountStack.Screen name={'Account'} component={AccountScreen} options={
            {
                title: 'Account',
                headerShown: false
            }
        }/>
    </AccountStack.Navigator>
);

const TrackCreate = () => (
    <TrackCreateStack.Navigator screenOptions={
        {
            headerShown: false
        }
    }>
        <TrackCreateStack.Screen name={'TrackCreate'} component={TrackCreateScreen} options={
            {
                title: 'Add Track'
            }
        }/>
    </TrackCreateStack.Navigator>
);

const TrackList = () => (
    <TrackListStack.Navigator>
        <TrackListStack.Screen name={'TrackList'} component={TrackListScreen} options={
            {
                title: 'Tracks'
            }
        }/>
        <TrackListStack.Screen name={'TrackDetail'} component={TrackDetailScreen}/>
    </TrackListStack.Navigator>
);

const MainFLowScreen = () => (

    <MainFlow.Navigator>
        <MainFlow.Screen name={'TrackList'} component={TrackList} options={{
            tabBarLabel: 'Tracks',
            tabBarIcon: ({color, size}) => (<FontAwesome name="th-list" size={size} color={color}/>),
        }}/>
        <MainFlow.Screen name={'TrackCreate'} component={TrackCreate} options={{
            tabBarLabel: 'Add Track',
            tabBarIcon: ({color, size}) => (<FontAwesome name="plus" size={size} color={color}/>),
        }}/>
        <MainFlow.Screen name={'Account'} component={Account} options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({color, size}) => (<FontAwesome name="gear" size={size} color={color}/>),
        }}/>
    </MainFlow.Navigator>
);

const LogFlowScreen = () => (
    <LoginFlow.Navigator screenOptions={{
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerShown: false
    }}>
        <LoginFlow.Screen name={'ResolveAuth'} component={ResolveAuthScreen} options={{
            title: "Waiting"
        }}/>

        <LoginFlow.Screen name={'Signup'} component={SignUpScreen} options={
            {
                title: 'Sign Up'
            }
        }/>
        <LoginFlow.Screen name={'Signin'} component={SignInScreen} options={
            {
                title: 'Sign In',
            }
        }/>
    </LoginFlow.Navigator>
);

const App = (props, ref) => {
    // const [isSignIn, setIsSignIn] = useState(false);

    const {state, signup} = useContext(AuthContext);
    const {token} = state;

    return (
        <NavigationContainer ref={navigationRef}>
            {
                token ? <MainFLowScreen/> : <LogFlowScreen/>
            }
        </NavigationContainer>
    );
};

export default () => (
    <SafeAreaProvider>
        <TrackProvider>
            <LocationProvider>
                <AuthProvider>
                    <App/>
                </AuthProvider>
            </LocationProvider>
        </TrackProvider>
    </SafeAreaProvider>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
