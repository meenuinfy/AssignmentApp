import {GENERATE_PIN, UPDATE_NAME, DELETE_PIN} from '../actions/types';

const initialState = {
  pinList: [],
};

const checkPinPresent = (oldPin, newPin) => {
  if (oldPin.length === 0) {
    oldPin = [...oldPin, newPin];
  } else {
    let shouldAdd = true;
    for (const oldpinVal of oldPin) {
      if (oldpinVal.id === newPin.id) {
        shouldAdd = false;
        break;
      }
    }
    if (shouldAdd) {
      oldPin = [...oldPin, newPin];
    }
  }
  return oldPin;
};

const updateNameList = (oldList, details) => {
  for (const pin of oldList) {
    if (pin.id === details.id) {
      pin.name = details.name;
      break;
    }
  }
  return oldList;
};

const GeneratePinReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_PIN: {
      let updatedList = checkPinPresent(state.pinList, action.payload);
      return {
        ...state,
        pinList: updatedList,
      };
    }

    case UPDATE_NAME: {
      let updateName = updateNameList(state.pinList, action.payload);
      return {
        ...state,
        pinList: updateName,
      };
    }

    case DELETE_PIN: {
      let updatedList = state.pinList.filter(
        item => item.id !== action.payload.item.id,
      );
      return {
        ...state,
        pinList: updatedList,
      };
    }

    default:
      return state;
  }
};

export default GeneratePinReducer;
