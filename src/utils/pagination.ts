import {IPaginationData, IPaginationInfo} from '@/types/app';

export const getPaginationInfo = ({
  currentPage = 1,
  totalPage = 0,
  totalItem = 0,
  total = 0,
}: Partial<IPaginationInfo>): IPaginationInfo => ({
  currentPage,
  totalPage,
  totalItem,
  total,
});

export const getPaginationData = <T>({
  data = [],
  pagination = {},
}: {
  data?: T[];
  pagination?: Partial<IPaginationInfo>;
} = {}): IPaginationData<T> => ({
  data,
  pagination: getPaginationInfo(pagination),
});

export const pushPagingData = <T>(
  dataPagingSource: IPaginationData<T>,
  pagingNewData: IPaginationData<T>,
): IPaginationData<T> => {
  const {data, pagination} = pagingNewData;

  return getPaginationData({
    data: [...dataPagingSource.data, ...data],
    pagination,
  });
};
