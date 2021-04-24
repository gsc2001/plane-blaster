import * as THREE from 'three';

export const randint = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

export const rand = (min, max) => Math.random() * (max - min + 1) + min;
