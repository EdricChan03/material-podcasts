import { FirebaseAppConfig } from '@angular/fire';
import { Version } from '@angular/core';

// This file is the base environment file for all of the environment files that
// inherit from this file

export interface Environment {
  /** Whether production mode is enabled */
  production?: boolean;
  /** The current version that the app is on. */
  currentVersion?: Version;
  /** The Firebase config for the current Firebase app */
  firebase?: FirebaseAppConfig | {
    apiKey?: string;
    authDomain?: string;
    databaseURL?: string;
    projectId?: string;
    storageBucket?: string;
    messagingSenderId?: string;
    appId?: string;
  };
}

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: 'AIzaSyCfGJCRWeYpr-4UmVhblx4gcBWzQldT9sE',
  authDomain: 'material-podcasts.firebaseapp.com',
  databaseURL: 'https://material-podcasts.firebaseio.com',
  projectId: 'material-podcasts',
  storageBucket: 'material-podcasts.appspot.com',
  messagingSenderId: '568691873449',
  appId: '1:568691873449:web:a8a13912d427fc33afbbb8',
  measurementId: 'G-CRKVD1REBB'
};

export const currentVersion: Version = new Version('1.0.0');

/** Base environment which other environments can extend from. */
export const baseEnvironment: Environment = {
  currentVersion,
  firebase: firebaseConfig
};

/**
 * Merges the specified environment with the base environment
 * and returns the result.
 * @param env The enviroment to merge
 */
export function mergeWithBaseEnv(env: Partial<Environment>): Environment {
  return { ...baseEnvironment, ...env };
}
