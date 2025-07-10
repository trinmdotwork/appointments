import React from 'react';
import {loadingSelector} from '@/store/app';
import {useAppSelector} from '@/hooks/redux';
import Loading from '../Loading';

const LoadingProvider = () => {
  const loading = useAppSelector(loadingSelector);

  return <Loading visible={loading.visible} />;
};

export default LoadingProvider;
