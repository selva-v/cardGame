import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const Card = ({ cardData, onCardSelect, onReset, resetFlip }) => {
  const [localShowCard, setLocalShowCard] = useState(false);
  const { number, isShow, isDone } = cardData;

  useEffect(() => {
    setLocalShowCard(isShow);
  }, [onReset, isShow, resetFlip]);

  const handleSelect = (cardData) => {
    if (!isDone && !isShow) {
      setLocalShowCard(!localShowCard);
      onCardSelect(cardData);
    }
  };

  return (
    <TouchableOpacity onPress={() => handleSelect(cardData)} disabled={isDone}>
      {!localShowCard ? (
        <View style={[styles.cardBack, styles.card]}>
          <Text style={[styles.cardText, styles.cardTextBack]}>{'?'}</Text>
        </View>
      ) : (
        <View style={[styles.cardFront, styles.card]}>
          <Text style={[styles.cardText, styles.cardTextFront]}>{number}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

let screenWidth = Math.round(Dimensions.get('window').width);
let screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: screenWidth / 3 - 15,
    height: screenHeight / 4 - 41,
    margin: 5,
  },
  cardBack: {
    backgroundColor: 'dodgerblue',
  },
  cardFront: {
    backgroundColor: 'rgba(30, 144, 255, 0.1)',
    borderWidth: 3,
    borderColor: 'dodgerblue',
  },
  cardText: {
    fontSize: 38,
    fontWeight: 'bold',
  },
  cardTextBack: {
    color: '#fff',
  },
  cardTextFront: {
    color: 'dodgerblue',
  },
});

export default Card;
