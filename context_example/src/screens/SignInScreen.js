import React, {useState, useContext} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Button, Text, Input} from 'react-native-elements';
import Spacer from "../components/Spacer";
import LogInStyle from "./styles/LogInStyle";
import {Context as AuthContext} from "../context/AuthContext";
import NavLink from "../components/NavLink";

const SignInScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {state, signin, clearErrorMsg, error} = useContext(AuthContext);

    const submit = () => {
        if (!email || !password) {
            error('Email and password are both required!')
            return;
        }
        signin({email, password});
    };

    navigation.addListener('focus', () => {
        // console.log('------------------------Focus');
        clearErrorMsg();
    });


    return (
        <View style={LogInStyle.container}>
            {/*<NavigationEvents*/}
            {/*onWillFocus={()=>{*/}
            {/*    console.log('onWillFocus');}}*/}
            {/*onDidFocus={()=>{*/}
            {/*    console.log('onDidFocus')*/}
            {/*}}*/}

            {/*onWillBlur={()=>{*/}
            {/*    console.log('onWillBlur')*/}
            {/*}}*/}
            {/*onDidBlur={()=>{*/}
            {/*    console.log('onDidBlur')*/}
            {/*}}*/}
            {/*/>*/}
            <Spacer>
                <Text h3> Sign In for Tracker</Text>
            </Spacer>
            <Spacer>
                <Input label={'Email'}
                       value={email}
                       onChangeText={setEmail}
                       autoCapitalize={'none'}
                       autoCorrect={false}
                />
            </Spacer>
            <Spacer>
                <Input
                    label={'Password'}
                    value={password}
                    onChangeText={setPassword}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                />
                {state.errorMsg ? <Text style={LogInStyle.errorMsg}>{state.errorMsg}</Text> : null}
            </Spacer>
            <Spacer/>
            <Spacer>
                <Button title={'Sign In'} onPress={submit}/>
            </Spacer>
            <Spacer>
                <NavLink text={'Don\'t have an account? Go back to Sign Up'} routeName={'Signup'}/>
                {/*<TouchableOpacity onPress={() => navigation.replace('Signup')}>*/}
                {/*    <Text style={LogInStyle.link}>Don't have an account? Go back to Sign Up</Text>*/}
                {/*</TouchableOpacity>*/}
            </Spacer>

        </View>
    );
};


export default SignInScreen;