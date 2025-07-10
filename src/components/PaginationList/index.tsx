import {SPACING} from '@/constants/theme';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  RefreshControl,
  View,
} from 'react-native';
import Separator from '../Separator';
import Typo from '../Typo';

interface IPaginationListProps<T> extends Omit<FlatListProps<T>, 'data'> {
  style?: any;
  contentContainerStyle?: any;
  isFetching?: boolean;
  pageStart?: number;
  dataPaging?: {
    data: T[];
    pagination: {
      currentPage: number;
      totalPage: number;
    };
  };
  onRefresh?: () => void;
  onFetch?: (page: number) => void;
  ListFooterComponent?: (isFetching: boolean) => React.ReactElement | null;
  ListComponent?: React.ComponentType<FlatListProps<T>>;
  ListEmptyComponent?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ComponentType<any>
    | null;
}

function PaginationList<T>({
  style,
  contentContainerStyle,
  isFetching = false,
  dataPaging,
  onRefresh,
  onFetch,
  ListFooterComponent,
  ListComponent,
  ListEmptyComponent,
  pageStart = 1,
  ...otherProps
}: IPaginationListProps<T>) {
  const [state, setState] = useState<{
    data: T[];
    hasData: boolean;
    currentPage: number;
  }>({
    data: [],
    hasData: false,
    currentPage: 1,
  });
  const refAll = useRef<{page: number}>({page: 1});
  const {t} = useTranslation();

  useEffect(() => {
    const {data: newData = [], pagination = {currentPage: 1, totalPage: 10}} =
      dataPaging || {};

    setState({
      data: newData,
      hasData: pagination.currentPage < pagination.totalPage,
      currentPage: pagination.currentPage,
    });
  }, [dataPaging]);

  useEffect(() => {
    refAll.current.page = pageStart;
  }, [pageStart]);

  const _ListEmptyComponent = useMemo(() => {
    if (isFetching) {
      return null;
    }
    if (ListEmptyComponent) {
      return ListEmptyComponent;
    }

    return (
      <View
        style={{
          padding: SPACING.M,
          alignItems: 'center',
          display: isFetching ? 'none' : 'flex',
          justifyContent: 'center',
          flex: 1,
        }}>
        <Typo
          typography="body2"
          colorAlias="secondary"
          colorCategory="textOnWhite">
          {t('list.empty')}
        </Typo>
      </View>
    );
  }, [ListEmptyComponent, isFetching, t]);

  const ListFooter = () => {
    if (ListFooterComponent) {
      return ListFooterComponent(isFetching);
    }
    return isFetching ? <ActivityIndicator /> : null;
  };

  const renderSeparatorComponent = useCallback(
    () => <Separator size={SPACING.M} />,
    [],
  );

  const keyExtractor = useCallback(
    (item: any, index: number) => (item?.id || index).toString(),
    [],
  );

  const onEndReached = useCallback(() => {
    const {currentPage, hasData} = state;

    if (
      hasData &&
      !isFetching &&
      dataPaging?.pagination?.totalPage &&
      currentPage <= dataPaging?.pagination?.totalPage
    ) {
      if (typeof onFetch === 'function') {
        onFetch(currentPage + 1);
      }
    }
  }, [state, isFetching, dataPaging?.pagination?.totalPage, onFetch]);

  const onRefreshControl = useCallback(() => {
    if (typeof onRefresh === 'function') {
      refAll.current.page = 1;
      setState(prevState => ({...prevState, currentPage: 1}));
      onRefresh();
    }
  }, [onRefresh]);

  const refreshControl = useCallback(
    () => <RefreshControl refreshing={false} onRefresh={onRefreshControl} />,
    [onRefreshControl],
  );

  const Container = useMemo(() => ListComponent || FlatList, [ListComponent]);

  return (
    <Container<T>
      refreshControl={refreshControl()}
      ItemSeparatorComponent={renderSeparatorComponent}
      keyboardDismissMode="on-drag"
      onEndReachedThreshold={0.8}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      {...otherProps}
      ListEmptyComponent={_ListEmptyComponent}
      onEndReached={onEndReached}
      ListFooterComponent={ListFooter}
      extraData={dataPaging?.data}
      data={dataPaging?.data}
      style={style}
      contentContainerStyle={[{paddingBottom: 80}, contentContainerStyle]}
    />
  );
}

export default PaginationList;
