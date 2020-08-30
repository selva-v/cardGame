import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import shuffleArray from '../utils/shuffleArray';
import Card from '../components/Card';

const GameScreen = () => {
  const [CARD_PAIRS_VALUE, setCardPairsValue] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [count, setCount] = useState(0);
  const [toggleAllCards, setToggleAllCards] = useState(false);
  const [resetFlip, setResetFlip] = useState(false);

  useEffect(() => {
    createNumbers();
  }, []);

  const createNumbers = () => {
    var numbers = [];
    while (numbers.length < 6) {
      var num = Math.floor(Math.random() * 100) + 1;
      if (numbers.indexOf(num) === -1) numbers.push(num);
    }
    numbers = [...numbers, ...numbers];
    numbers = shuffleArray(numbers);
    numbers = numbers.map((val, index) => {
      return {
        key: index,
        number: val,
        isShow: false,
        isDone: false,
      };
    });
    setCount(0);
    setCardPairsValue(numbers);
  };

  const handleCardSelect = (card) => {
    let index = card.key;
    let tmpCards = CARD_PAIRS_VALUE;
    tmpCards[index].isShow = !tmpCards[index].isShow;
    setCardPairsValue([...tmpCards]);
    let flippedCards = [...flipped, card];
    setFlipped(flippedCards);
    setCount(count + 1);

    if (flippedCards.length === 2) {
      if (flippedCards[0].number != flippedCards[1].number) {
        setTimeout(() => {
          tmpCards[flippedCards[0].key].isShow = false;
          tmpCards[flippedCards[1].key].isShow = false;
          setCardPairsValue([...tmpCards]);
          setFlipped([]);
          setResetFlip(!resetFlip);
        }, 1000);
      } else {
        tmpCards[flippedCards[0].key].isDone = true;
        tmpCards[flippedCards[1].key].isDone = true;
        setCardPairsValue([...tmpCards]);
        setFlipped([]);
      }
    }

    let pendingCards = tmpCards.filter((card) => (!card.isDone ? card : ''));
    if (pendingCards.length == 0) {
      Alert.alert('congratulation', 'You have completed the game', [{ text: 'OK', onPress: () => handleReset() }], {
        cancelable: false,
      });
    }
  };

  const handleReset = () => {
    setToggleAllCards(!toggleAllCards);
    createNumbers();
  };

  return (
    <View style={styles.container}>
      <View style={styles.actionBar}>
        <TouchableOpacity onPress={handleReset}>
          <Text style={styles.resetButton}>Restart</Text>
        </TouchableOpacity>
        <View style={styles.infoItem}>
          <Text style={styles.steps}>STEPS: </Text>
          <Text style={styles.count}>{count}</Text>
        </View>
      </View>
      <FlatList
        numColumns={3}
        data={CARD_PAIRS_VALUE}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          return (
            <Card cardData={item} onCardSelect={handleCardSelect} onReset={toggleAllCards} resetFlip={resetFlip} />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 5,
    marginRight: 15,
  },
  resetButton: {
    color: 'dodgerblue',
    fontSize: 20,
    paddingLeft: 20,
    paddingVertical: 10,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  steps: {
    fontSize: 18,
    color: '#060606',
    marginRight: 5,
  },
  count: {
    fontSize: 20,
    color: 'dodgerblue',
  },
});

export default GameScreen;
