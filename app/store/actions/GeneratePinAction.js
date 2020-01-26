import {GENERATE_PIN, UPDATE_NAME, DELETE_PIN} from './types';

export function addPin(payload) {
  return {
    type: GENERATE_PIN,
    payload,
  };
}

export function updateName(payload) {
  return {
    type: UPDATE_NAME,
    payload,
  };
}

export function deletePin(payload) {
  return {
    type: DELETE_PIN,
    payload,
  };
}
