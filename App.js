import React, { useState } from 'react';
import { Picker, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

export default function App() {
  const BOTTLESMAX = 12;
  const HOURSMAX = 24;

  const [weight, setWeight] = useState(0);
  const [bottles, setBottles] = useState(0);
  const [time, setTime] = useState(0);
  const [gender, setGender] = useState('male');
  const [promilles, setPromilles] = useState(0)

  const bottlesChoice = [];
  for (let i = 0; i < BOTTLESMAX; i++) {
    bottlesChoice.push({ label: i + 1, value: i + 1 })
  }

  const timeChoice = [];
  for (let i = 0; i < HOURSMAX; i++) {
    timeChoice.push({ label: i + 1, value: i + 1 })
  }

  const genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ];

  function calculatePromilles() {
    if (bottles !== 0 &&
      weight !== 0 &&
      time !== 0) {
      const litres = bottles * 0.33;
      const grams = litres * 8 * 4.5;
      const burning = weight / 10;
      const gramsLeft = grams - burning * time;

      if (gramsLeft > 0) {
        if (gender === 'male') {
          setPromilles(gramsLeft / (weight * 0.7))
        } else {
          setPromilles(gramsLeft / (weight * 0.6))
        }
      } else {
        setPromilles(0)
      }
    } else {
      setPromilles(0)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text>Weight</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setWeight(text)}
          placeholder="in kilograms"
          keyboardType="numeric">
        </TextInput>
      </View>
      <View style={styles.field}>
        <Text>Bottles</Text>
        <Picker style={styles.field}
          onValueChange={(itemValue) => setBottles(itemValue)}
          selectedValue={bottles}>
          {bottlesChoice.map((bottles, index) => (
            <Picker.Item key={index} label={bottles.label + ' bottles'} value={bottles.value} />
          ))}
        </Picker>
      </View>
      <View style={styles.field}>
        <Text>Time</Text>
        <Picker style={styles.field}
          onValueChange={(itemValue) => setTime(itemValue)}
          selectedValue={time}>
          {timeChoice.map((time, index) => (
            <Picker.Item key={index} label={time.label + ' hours'} value={time.value} />
          ))}
        </Picker>
      </View>
      <View style={styles.field}>
        <Text>Gender</Text>
        <RadioForm
          style={styles.radio}
          buttonSize={10}
          radio_props={genders}
          initial={0}
          onPress={(value) => { setGender(value) }}
        />
      </View>
      <View style={styles.field}>
        <Text>Promilles</Text>
        <Text>{promilles.toFixed(2)}</Text>
      </View>
      <Button onPress={calculatePromilles} title="Calculate"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    marginTop: 20
  },
  field: {
    margin: 10
  },
  input: {
    marginLeft: 10
  },
  radio: {
    margin: 10
  }
});
