import React from 'react';

import { UserProvider, UserProviderProps, UserProfile } from '../../src';
import { ConfigProvider, ConfigProviderProps, NetworkError } from '../../src/frontend';

type FetchUserMock = {
  ok: boolean;
  json?: () => Promise<UserProfile>;
};

export const user: UserProfile = {
  email: 'foo@example.com',
  email_verified: true,
  name: 'foo',
  nickname: 'foo',
  picture: 'foo.jpg',
  sub: '1',
  updated_at: null
};

export const withUserProvider = ({
  user,
  profileUrl,
  loginUrl,
  fetcher
}: UserProviderProps = {}): React.ComponentType => {
  return (props: any): React.ReactElement => (
    <UserProvider {...props} user={user} profileUrl={profileUrl} loginUrl={loginUrl} fetcher={fetcher} />
  );
};

export const fetchUserMock = (): Promise<FetchUserMock> => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(user)
  });
};

export const fetchUserUnsuccessfulMock = (): Promise<FetchUserMock> => {
  return Promise.resolve({ ok: false });
};

export const fetchUserJSONErrorMock = (): Promise<FetchUserMock> => {
  return Promise.resolve({
    ok: true,
    json: () => {
      throw new Error();
    }
  });
};

export const fetchUserNetworkErrorMock = (): Promise<FetchUserMock> => {
  return Promise.reject(new NetworkError());
};

export const withConfigProvider = ({ loginUrl }: ConfigProviderProps = {}): React.ComponentType => {
  return (props: any): React.ReactElement => <ConfigProvider {...props} loginUrl={loginUrl} />;
};
