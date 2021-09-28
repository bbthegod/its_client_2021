/*
 *
 * ReadyPage Selector
 *
 */
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types/RootState';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.readyPage || initialState;

export const selectReadyPage = createSelector(selectSlice, state => state);
