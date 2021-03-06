import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import { inject, observer } from 'mobx-react';

import userAction from '../../actions/User';
import { form, icon, color } from '../../styles';
import logoPng from '../../images/logo.png';

const {
  KeyboardAvoidingView,
  Image,
  Button,
  TextInput,
  View,
  AsyncStorage
} = ReactNative;

@inject('user')
@observer
class Login extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  componentWillMount() {
    const { user } = this.props;
    AsyncStorage.getItem('@UserStore:name', (key, value) => {
      user.name = value;
      this.setState({ name: value });
    });
  }

  _login = () => {
    const { user } = this.props;
    userAction.login(user.name, user.password).then((sc) => {
      if (sc === 0) {
        this.props.navigation.goBack();
      }
    });
  }

  render() {
    const { user } = this.props;

    return (
      <KeyboardAvoidingView behavior="padding" style={form.wrap}>
        <Image
          source={logoPng}
          style={[icon.big, form.logo]}
        />
        <TextInput
          style={form.input}
          value={this.state.name}
          underlineColorAndroid="transparent"
          placeholder="用户名／邮箱"
          onChangeText={(text) => {
            this.setState({ name: text });
            user.name = text;
          }}
        />
        <TextInput
          style={form.input}
          underlineColorAndroid="transparent"
          placeholder="密码"
          secureTextEntry
          onChangeText={(text) => {
            user.password = text;
          }}
        />
        <View style={form.button}>
          <Button
            onPress={this._login}
            color={color.green}
            title="登录"
            accessibilityLabel="登录"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Login;
