import {
  Toast,
  ToastComponent,
  ToastType,
} from '@iqorlobanov/react-native-toast';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ButtonProps = {
  name: string;
  onPress: () => void;
};

const Button: React.FC<ButtonProps> = ({ name, onPress }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={styles.btnName}>{name}</Text>
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Button
          name={'SHOW SUCCESS'}
          onPress={() => {
            Toast.show({
              title: 'Success',
              description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
              type: ToastType.SUCCESS,
              visibilityTime: 5000,
            });
          }}
        />
        <Button
          name={'SHOW INFO'}
          onPress={() => {
            Toast.show({
              title: 'Info',
              description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
              type: ToastType.INFO,
              visibilityTime: 5000,
            });
          }}
        />
        <Button
          name={'SHOW WARNING'}
          onPress={() => {
            Toast.show({
              title: 'Warning',
              description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
              type: ToastType.WARNING,
              visibilityTime: 5000,
            });
          }}
        />
        <Button
          name={'SHOW ERROR'}
          onPress={() => {
            Toast.show({
              title: 'Error',
              description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
              type: ToastType.ERROR,
              visibilityTime: 5000,
              touchable: false,
            });
          }}
        />
        <Button
          name={'HIDE'}
          onPress={() => {
            Toast.hide();
          }}
        />
      </View>

      <ToastComponent />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    margin: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    opacity: 0.8,
  },
});
