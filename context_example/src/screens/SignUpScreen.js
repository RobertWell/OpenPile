import React, {useContext,  useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import LogInStyle from "./styles/LogInStyle";
import {Context as AuthContext} from "../context/AuthContext";
import Spacer from "../components/Spacer";
import {Input, Text, Button} from "react-native-elements";
import NavLink from "../components/NavLink";

const SignUpScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {state, signup, error} = useContext(AuthContext);



    const submit = () => {
        if (!email || !password) {
            error('Email and password are both required!');
            return;
        }
        signup({email, password});
    };

    return (
        <View style={LogInStyle.container}>
            <Spacer>
                <Text h3> Sign Up for Tracker</Text>
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
                <Button title={'Sign Up'} onPress={submit}/>
            </Spacer>
            <Spacer>
                {/*<TouchableOpacity onPress={()=>navigation.replace('Signin')}>*/}
                {/*    <Text style={LogInStyle.link}>Already have an account? Sign In instead</Text>*/}
                {/*</TouchableOpacity>*/}
                <NavLink text={'Already have an account? Sign In instead'} routeName={'Signin'}/>

            </Spacer>


        </View>
    );
};

export default SignUpScreen;